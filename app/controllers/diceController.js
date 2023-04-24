const mongoose = require("mongoose");

const diceHistoryModel = require("../models/diceHistoryModel");
const prizeHistoryModel = require("../models/prizeHistoryModel");
const prizeModel = require("../models/prizeModel");
const userModel = require("../models/userModel");
const voucherHistoryModel = require("../models/voucherHistoryModel");
const voucherModel = require("../models/voucherModel");

/* 
1. Tìm user
2.1. User không tồn tại-> 
Create user{firstName, lastName, userName}
Create diceHistory {user: userName._id, dice: random}
dice <3 => prize : null, voucher : null==>End
dice > 3=>
Create voucherHistoty{user:user._id, voucher: newVoucher} Kiểm tra 3 lần gần nhất của diceHistory với user._id
+ 1 trong 3 lần nhỏ hơn 3=>prize:null
+ 3 lần đều lớn hơn 3 => Create prizeHistoty {user: user.id,prize: random } 
2.2. User đã tồn tại
Create diceHistory {user: userName._id, dice: random}
+ dice <3 => prize : null, voucher : null==>End
+ dice > 3:  
    Create voucherHistoty{user:user._id, voucher: newVoucher}
Kiểm tra 3 lần gần nhất của diceHistory với user._id
+ 1 trong 3 lần nhỏ hơn 3=>prize:null
+ 3 lần đều lớn hơn 3 => Create prizeHistoty {user: user.id,prize: random } 
 */


const diceHandler = async (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const { userName, firstName, lastName } = request.body;
    const fields = ["userName", "firstName", "lastName"]

    // B2: Validate dữ liệu từ request body
    for (const field of fields) {
        if (!request.body[field]) {
            return response.status(400).json({
                status: "Error 400: Bad request",
                message: `${field} is required`
            })
        }
    }

    //B3: Create Dice for user
    try {
        let userExist = await userModel.findOne({ userName });
        // If userName not Exist, then create new user
        if (!userExist) {
            userExist = await userModel.create({
                _id: mongoose.Types.ObjectId(),
                userName: userName,
                lastName: lastName,
                firstName: firstName,
            })
        }

        // Random dice from 1 to 6
        let dice = Math.floor(Math.random() * 6 + 1);

        // Create diceHistory 
        await diceHistoryModel.create({
            _id: mongoose.Types.ObjectId(),
            user: userExist._id,
            dice: dice,
        })
        let prizeCreated = null
        let voucherCreated = null

        if (dice >= 3) {
            //Random Voucher If dice >= 3 
            let countVoucher = await voucherModel.countDocuments(); //Count voucher total in database
            let randomVoucher = Math.floor(Math.random() * countVoucher);
            voucherCreated = await voucherModel.findOne().skip(randomVoucher);

            // Create voucher History with user._id
            await voucherHistoryModel.create({
                user: userExist._id,
                voucher: voucherCreated._id,
            })

            // Check latest 3 dice of User
            const last3DiceHistory = await diceHistoryModel
                .find({ user: userExist._id })
                .sort({ _id: -1 })
                .limit(3)
                .exec();
            const diceArray = last3DiceHistory.map(item => item.dice);

            /* if any of the last 3 dice values is less than 3
            or:if the user has less than 3 dice history
            => not get prize and return response */
            if (diceArray.length < 3 || diceArray.some(dice => dice < 3)) {
                //B4: Send response 
                return response.status(200).json({
                    dice: dice,
                    voucher: voucherCreated.discount,
                    prize: null
                })
            }

            // Else - get random prize
            let countPrize = await prizeModel.countDocuments();//Count Prize in database
            let randomPrize = Math.floor(Math.random() * countPrize);
            prizeCreated = await prizeModel.findOne().skip(randomPrize);

            await prizeHistoryModel.create({
                user: userExist._id,
                prize: prizeCreated._id,
            })
        }
        
        //B4: Send response 
        return response.status(200).json({
            dice: dice,
            voucher: voucherCreated ? voucherCreated.discount : null,
            prize: prizeCreated ? prizeCreated.name : null,
        })

    } catch (error) {
        console.log(error);
        return response.status(500).json({
            status: "Error 500: Internal server error",
            message: error.message
        })
    }
}

module.exports = {
    diceHandler
}