// Import thư viện mongoose
const mongoose = require("mongoose");

// Import PrizeHistory Model
const prizeHistoryModel = require("../models/prizeHistoryModel");

const createPrizeHistory = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const user = request.body.user;
    const prize = request.body.prize;

    // const prizeResult = getNewPrize();
    console.log(user);
    console.log(prize);


    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(user)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "User Id không hợp lệ"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(prize)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "User Id không hợp lệ"
        })
    }

    // B3: Thao tác với cơ sở dữ liệu
    const newPrizeHistory = {
        _id: mongoose.Types.ObjectId(),
        user: user,
        prize: prize
    }

    prizeHistoryModel.create(newPrizeHistory, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            return response.status(201).json({
                status: "Create PrizeHistory Successfully",
                data: data
            })
        }

    })
}

const getPrizeHistoryById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const prizeHistoryId = request.params.historyId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(prizeHistoryId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "PrizeHistoryId không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    prizeHistoryModel.findById(prizeHistoryId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get detail prizeHistory successfully",
            data: data
        })
    })
}

const getAllPrizeHistory = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệu
    prizeHistoryModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get all prizeHistory successfully",
            data: data
        })
    })
}

const updatePrizeHistoryById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const prizeHistoryId = request.params.historyId;
    const body = request.body;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(prizeHistoryId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "PrizeHistoryId không hợp lệ"
        })
    }

    if (body.user !== undefined && (!mongoose.Types.ObjectId.isValid(body.user))) {
        return response.status(400).json({
            status: "Bad Request",
            message: "user không hợp lệ"
        })
    }

    if (body.prize !== undefined && (!mongoose.Types.ObjectId.isValid(body.prize))) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Prize không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const updatePrizeHistory = {}

    if (body.user !== undefined) {
        updatePrizeHistory.user = body.user
    }

    if (body.prize !== undefined) {
        updatePrizeHistory.prize = body.prize
    }

    prizeHistoryModel.findByIdAndUpdate(prizeHistoryId, updatePrizeHistory, (error, data) => {
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

const deletePrizeHistoryById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const prizeHistoryId = request.params.historyId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(prizeHistoryId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "prizeHistory không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    prizeHistoryModel.findByIdAndDelete(prizeHistoryId, (error, data) => {
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

module.exports = {
    getPrizeHistoryById,
    createPrizeHistory,
    getAllPrizeHistory,
    updatePrizeHistoryById,
    deletePrizeHistoryById
}