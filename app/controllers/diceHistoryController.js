// Import thư viện mongoose
const mongoose = require("mongoose");

// Import DiceHistory Model
const diceHistoryModel = require("../models/diceHistoryModel");
const userModel = require("../models/userModel");


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

    // if (!(Number.isInteger(body.user) && body.user > 0 && body.user <= 5)) {
    //     return response.status(400).json({
    //         status: "Bad Request",
    //         message: "Rate không hợp lệ"
    //     })
    // }

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

        //     // Thêm Id của diceHistory mới vào mảng user của user đã chọn
        //     userModel.findByIdAndUpdate(userId, {
        //         $push: {
        //             user: data._id
        //         }
        //     }, (err, updatedUser) => {
        //         if (err) {
        //             return response.status(500).json({
        //                 status: "Internal server error",
        //                 message: err.message
        //             })
        //         }

        //         return response.status(201).json({
        //             status: "Create DiceHistory Successfully",
        //             data: data
        //         })
        //     })
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
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệu
    diceHistoryModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get all diceHistory successfully",
            data: data
        })
    })
}

const getAllDiceHistoryOfUser = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const userId = request.params.userId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "User Id không hợp lệ"
        })
    }

    // B3: Thao tác với cơ sở dữ liệu
    userModel.findById(userId)
        .populate("user")
        .exec((error, data) => {
            if (error) {
                return response.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }

            return response.status(200).json({
                status: "Get all diceHistory of user successfully",
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

    if (body.user !== undefined && (!mongoose.Types.ObjectId.isValid(body.user))) {
        return response.status(400).json({
            status: "Bad Request",
            message: "user không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const updateDiceHistory = {}

    if (body.user !== undefined) {
        updateDiceHistory.user = body.user
    }

    if (body.dice !== undefined) {
        updateDiceHistory.dice = body.dice
    }

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
            status: "Delete User successfully"
        })
    })
}

const getNewDice = () => {
    return Math.floor(6 * Math.random()) + 1;;
}

module.exports = {
    getDiceHistoryById,
    createDiceHistory,
    getAllDiceHistory,
    // getAllDiceHistoryOfUser,
    updateDiceHistoryById,
    deleteDiceHistoryById
}