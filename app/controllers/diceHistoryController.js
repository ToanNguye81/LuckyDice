// Import thư viện mongoose
const mongoose = require("mongoose");

// Import DiceHistory Model
const diceHistoryModel = require("../models/diceHistoryModel");
const userModel = require("../models/diceHistoryModel");


const createDiceHistory = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const userId = request.body.userId;
    const diceResult = getNewDice();
    console.log(diceResult);

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "User Id không hợp lệ"
        })
    }

    // B3: Thao tác với cơ sở dữ liệu
    const newDiceHistory = {
        _id: mongoose.Types.ObjectId(),
        user: userId,
        dice: diceResult
    }

    diceHistoryModel.create(newDiceHistory, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            return response.status(201).json({
                status: "Create DiceHistory Successfully",
                data: data
            })
        }

    })
}

const getDiceHistoryById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const diceHistoryId = request.params.diceHistoryId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(diceHistoryId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "DiceHistoryId không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    diceHistoryModel.findById(diceHistoryId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get detail diceHistory successfully",
            data: data
        })
    })
}

const getAllDiceHistory = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    //thu thập dữ liệu trên front-end
    // let userId = request.query.user;

    let userId = request.user;

    // //tạo ra điều kiện lọc
    let condition = {};

    if (userId) {
        condition.user = userId;
    }
    // B2: Validate dữ liệu
    //Nếu userQuery tồn tại thì tìm dữ liệu trong userModel theo user
    diceHistoryModel
        .find(condition)
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
            return response.status(200).json({
                status: "Get all dice histories successfully",
                data: data
            })
        })

}

const updateDiceHistoryById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const diceHistoryId = request.params.diceHistoryId;
    const body = request.body;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(diceHistoryId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "DiceHistoryId không hợp lệ"
        })
    }

    if (body.dice !== undefined && !(Number.isInteger(body.dice) && body.dice > 0 && body.dice <= 6)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Dice không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const updateDiceHistory = { dice: body.dice }

    diceHistoryModel.findByIdAndUpdate(diceHistoryId, updateDiceHistory, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Update reivew successfully",
            data: data
        })
    })
}

const deleteDiceHistoryById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const diceHistoryId = request.params.diceHistoryId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(diceHistoryId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "diceHistory không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    diceHistoryModel.findByIdAndDelete(diceHistoryId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(200).json({
            status: "Delete User successfully",
            "data": data
        })
    })
}

const getNewDice = () => {
    return Math.floor(6 * Math.random()) + 1;;
}

//function find dice history by username
const getDiceHistoryByUsername = (request, response) => {
    //B1: chuẩn bị dữ liệu
    const username = request.query.username;

    // Sử dụng userModel tìm kiếm bằng username
    userModel.findOne({
        username: username
    }, (errorFindUser, userExist) => {
        if (errorFindUser) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: errorFindUser.message
            })
        } else {
            console.log("==========================")
            console.log(userExist)
            getAllDiceHistory(userExist)
        }
    })

    // //nếu không truyền vào query username
    // diceHistoryModel.find((error, data) => {
    //     if (error) {
    //         return response.status(500).json({
    //             status: "Internal server error",
    //             message: error.message
    //         })
    //     }
    //     return response.status(200).json({
    //         status: "Get all dice histories successfully",
    //         data: data
    //     })
    // });
    // console.log(username)
}


module.exports = {
    getDiceHistoryById,
    getDiceHistoryByUsername,
    createDiceHistory,
    getAllDiceHistory,
    updateDiceHistoryById,
    deleteDiceHistoryById
}