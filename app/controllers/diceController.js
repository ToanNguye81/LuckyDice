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

// const diceHandler = (request, response) => {
//     // B1: Chuẩn bị dữ liệu
//     const { userName, firstName, lastName } = request.body;
//     console.log({ userName, firstName, lastName })

//     // Random 1 giá trị xúc xắc bất kỳ
//     let dice = Math.floor(Math.random() * 6 + 1);

//     // B2: Validate dữ liệu từ request body
//     if (!userName) {
//         return response.status(400).json({
//             status: "Error 400: Bad request",
//             message: "Username is required"
//         })
//     }

//     if (!firstName) {
//         return response.status(400).json({
//             status: "Error 400: Bad request",
//             message: "Firstname is required"
//         })
//     }

//     if (!lastName) {
//         return response.status(400).json({
//             status: "Error 400: Bad request",
//             message: "Lastname is required"
//         })
//     }

//     // Sử dụng userModel tìm kiếm bằng userName
//     userModel.findOne({
//         userName: userName
//     }, (errorFindUser, userExist) => {
//         if (errorFindUser) {
//             console.log("error FindUser")
//             return response.status(500).json({
//                 status: "Error 500: Internal server error",
//                 message: errorFindUser.message
//             })
//         } else {
//             if (!userExist) {
//                 // Nếu user không tồn tại trong hệ thống
//                 // Tạo user mới
//                 userModel.create({
//                     _id: mongoose.Types.ObjectId(),
//                     userName: userName,
//                     firstName: firstName,
//                     lastName: lastName
//                 }, (errCreateUser, userCreated) => {
//                     if (errCreateUser) {
//                         console.log("err Create User")

//                         return response.status(500).json({
//                             status: "Error 500: Internal server error",
//                             message: errCreateUser.message
//                         })
//                     } else {
//                         // Xúc xắc 1 lần, lưu lịch sử vào Dice History
//                         diceHistoryModel.create({
//                             _id: mongoose.Types.ObjectId(),
//                             user: userCreated._id,
//                             dice: dice
//                         }, (errorDiceHistoryCreate, diceHistoryCreated) => {
//                             if (errorDiceHistoryCreate) {
//                                 console.log("error DiceHistory Create")
//                                 return response.status(500).json({
//                                     status: "Error 500: Internal server error",
//                                     message: errorDiceHistoryCreate.message
//                                 })
//                             } else {
//                                 if (dice < 3) {
//                                     // Nếu dice < 3, không nhận được voucher và prize gì cả
//                                     return response.status(200).json({
//                                         dice: dice,
//                                         prize: null,
//                                         voucher: null
//                                     })
//                                 } else {
//                                     // Nếu dice > 3, thực hiện lấy random một giá trị voucher bất kỳ trong hệ thống
//                                     voucherModel.count().exec((errorCountVoucher, countVoucher) => {
//                                         let randomVoucher = Math.floor(Math.random * countVoucher);

//                                         voucherModel.findOne().skip(randomVoucher).exec((errorFindVoucher, voucherCreated) => {
//                                             // Lưu voucher History
//                                             voucherHistoryModel.create({
//                                                 _id: mongoose.Types.ObjectId(),
//                                                 user: userCreated._id,
//                                                 voucher: voucherCreated._id
//                                             }, (errorCreateVoucherHistory, voucherHistoryCreated) => {
//                                                 if (errorCreateVoucherHistory) {
//                                                     return response.status(500).json({
//                                                         status: "Error 500: Internal server error",
//                                                         message: errorCreateVoucherHistory.message
//                                                     })
//                                                 } else {
//                                                     if (errorCreateVoucherHistory) {
//                                                         return response.status(500).json({
//                                                             status: "Error 500: Internal server error",
//                                                             message: errorCreateVoucherHistory.message
//                                                         })
//                                                     } else {
//                                                         // User mới không có prize
//                                                         return response.status(200).json({
//                                                             dice: dice,
//                                                             prize: null,
//                                                             voucher: voucherCreated
//                                                         })
//                                                     }
//                                                 }
//                                             })
//                                         })
//                                     })
//                                 }
//                             }
//                         })
//                     }
//                 })
//             } else {
//                 // Nếu user đã tồn tại trong hệ thống
//                 // Xúc xắc 1 lần, lưu lịch sử vào Dice History
//                 diceHistoryModel.create({
//                     _id: mongoose.Types.ObjectId(),
//                     user: userExist._id,
//                     dice: dice
//                 }, (errorDiceHistoryCreate, diceHistoryCreated) => {
//                     if (errorDiceHistoryCreate) {
//                         return response.status(500).json({
//                             status: "Error 500: Internal server error",
//                             message: errorDiceHistoryCreate.message
//                         })
//                     } else {
//                         if (dice < 3) {
//                             // Nếu dice < 3, không nhận được voucher và prize gì cả
//                             return response.status(200).json({
//                                 dice: dice,
//                                 prize: null,
//                                 voucher: null
//                             })
//                         } else {
//                             // Nếu dice > 3, thực hiện lấy random một giá trị voucher bất kỳ trong hệ thống
//                             voucherModel.count().exec((errorCountVoucher, countVoucher) => {
//                                 let randomVoucher = Math.floor(Math.random * countVoucher);
//                                 voucherModel.findOne().skip(randomVoucher).exec((errorFindVoucher, voucherCreated) => {
//                                     // Lưu voucher History
//                                     voucherHistoryModel.create({
//                                         _id: mongoose.Types.ObjectId(),
//                                         user: userExist._id,
//                                         voucher: voucherCreated._id
//                                     }, (errorCreateVoucherHistory, voucherHistoryCreated) => {
//                                         if (errorCreateVoucherHistory) {
//                                             return response.status(500).json({
//                                                 status: "Error 500: Internal server error",
//                                                 message: errorCreateVoucherHistory.message
//                                             })
//                                         } else {
//                                             // Lấy 3 lần gieo xúc xắc gần nhất của user
//                                             diceHistoryModel
//                                                 .find()
//                                                 .sort({
//                                                     _id: -1
//                                                 })
//                                                 .limit(3)
//                                                 .exec((errorFindLast3DiceHistory, last3DiceHistory) => {
//                                                     if (errorFindLast3DiceHistory) {
//                                                         return response.status(500).json({
//                                                             status: "Error 500: Internal server error",
//                                                             message: errorFindLast3DiceHistory.message
//                                                         })
//                                                     } else {
//                                                         // Nếu chưa ném đủ 3 lần, không nhận được prize
//                                                         if (last3DiceHistory.length < 3) {
//                                                             return response.status(200).json({
//                                                                 dice: dice,
//                                                                 prize: null,
//                                                                 voucher: voucherCreated
//                                                             })
//                                                         } else {
//                                                             console.log(last3DiceHistory)
//                                                             // Kiểm tra 3 dice gần nhất
//                                                             let checkHavePrize = true;
//                                                             last3DiceHistory.forEach(diceHistory => {
//                                                                 if (diceHistory.dice < 3) {
//                                                                     // Nếu 3 lần gần nhất có 1 lần xúc xắc nhỏ hơn 3 => không nhận được giải thưởng
//                                                                     checkHavePrize = false;
//                                                                 }
//                                                             });

//                                                             if (!checkHavePrize) {
//                                                                 return response.status(200).json({
//                                                                     dice: dice,
//                                                                     prize: null,
//                                                                     voucher: voucherCreated
//                                                                 })
//                                                             } else {
//                                                                 // Nếu đủ điều kiện nhận giải thưởng, tiến hành lấy random 1 prize trong prize Model
//                                                                 prizeModel.count().exec((errorCountPrize, countPrize) => {
//                                                                     let randomPrize = Math.floor(Math.random * countPrize);

//                                                                     prizeModel.findOne().skip(randomPrize).exec((errorFindPrize, prizeVoucher) => {
//                                                                         // Lưu prize History
//                                                                         prizeHistoryModel.create({
//                                                                             _id: mongoose.Types.ObjectId(),
//                                                                             user: userExist._id,
//                                                                             prize: prizeVoucher._id
//                                                                         }, (errorCreatePrizeHistory, voucherPrizeCreated) => {
//                                                                             if (errorCreatePrizeHistory) {
//                                                                                 return response.status(500).json({
//                                                                                     status: "Error 500: Internal server error",
//                                                                                     message: errorCreatePrizeHistory.message
//                                                                                 })
//                                                                             } else {
//                                                                                 // Trả về kết quả cuối cùng
//                                                                                 return response.status(200).json({
//                                                                                     dice: dice,
//                                                                                     prize: prizeVoucher,
//                                                                                     voucher: voucherCreated
//                                                                                 })
//                                                                             }
//                                                                         })
//                                                                     })
//                                                                 })
//                                                             }
//                                                         }
//                                                     }
//                                                 })
//                                         }
//                                     })
//                                 })
//                             })
//                         }
//                     }
//                 })
//             }
//         }
//     })
// }

module.exports = {
    // diceHandler,
    diceHandler
}