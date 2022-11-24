// Import thư viện mongoose
const mongoose = require("mongoose");

// Import PrizeHistory Model
const prizeHistoryModel = require("../models/prizeHistoryModel");

const createPrizeHistory = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const userId = request.body.userId;
    const prizeResult = getNewPrize();
    console.log(prizeResult);

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "User Id không hợp lệ"
        })
    }

    // B3: Thao tác với cơ sở dữ liệu
    const newPrizeHistory = {
        _id: mongoose.Types.ObjectId(),
        user: userId,
        prize: prizeResult
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
    const prizeHistoryId = request.params.prizeHistoryId;

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
    const prizeHistoryId = request.params.prizeHistoryId;
    const body = request.body;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(prizeHistoryId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "PrizeHistoryId không hợp lệ"
        })
    }

    if (body.prize !== undefined && !(Number.isInteger(body.prize) && body.prize > 0 && body.prize <= 6)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Prize không hợp lệ"
        })
    }

    if (body.user !== undefined && (!mongoose.Types.ObjectId.isValid(body.user))) {
        return response.status(400).json({
            status: "Bad Request",
            message: "user không hợp lệ"
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
    const prizeHistoryId = request.params.prizeHistoryId;

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

const getNewPrize = () => {
    return Math.floor(6 * Math.random()) + 1;;
}

module.exports = {
    getPrizeHistoryById,
    createPrizeHistory,
    getAllPrizeHistory,
    updatePrizeHistoryById,
    deletePrizeHistoryById
}