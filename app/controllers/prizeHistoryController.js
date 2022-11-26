// Import thư viện mongoose
const mongoose = require("mongoose");

// Import PrizeHistory Model
const prizeHistoryModel = require("../models/prizeHistoryModel");

const createPrizeHistory = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const userId = request.body.userId;
    const prizeId = request.body.prizeId;

    // const prizeResult = getNewPrize();
    console.log(userId);
    console.log(prizeId);


    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "User Id không hợp lệ"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(prizeId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "User Id không hợp lệ"
        })
    }

    // B3: Thao tác với cơ sở dữ liệu
    const newPrizeHistory = {
        _id: mongoose.Types.ObjectId(),
        user: userId,
        prize: prizeId
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
    //thu thập dữ liệu trên front-end
    let userId = req.query.user;

    //tạo ra điều kiện lọc
    let condition = {};

    if (userId) {
        condition.user = userId;
    }
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệu
    prizeHistoryModel
        .find(condition)
        .exec((err, data) => {
            if (err) {
                return request.status(500).json({
                    status: "Error 500: internal server error",
                    message: err.message
                })
            } else {
                return request.status(201).json({
                    status: "Load all prize history successfully!",
                    data: data
                })
            }
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

    if (body.userId !== undefined && (!mongoose.Types.ObjectId.isValid(body.userId))) {
        return response.status(400).json({
            status: "Bad Request",
            message: "user không hợp lệ"
        })
    }

    if (body.prizeId !== undefined && (!mongoose.Types.ObjectId.isValid(body.prizeId))) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Prize không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const updatePrizeHistory = {}

    if (body.userId !== undefined) {
        updatePrizeHistory.user = body.userId
    }

    if (body.prizeId !== undefined) {
        updatePrizeHistory.prize = body.prizeId
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