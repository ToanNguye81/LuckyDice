// Import thư viện mongoose
const mongoose = require("mongoose");

// Import VoucherHistory Model
const voucherHistoryModel = require("../models/voucherHistoryModel");

const createVoucherHistory = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const user = request.body.user;
    const voucher = request.body.voucher;

    // const voucherResult = getNewVoucher();
    console.log(user);
    console.log(voucher);


    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(user)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "User Id không hợp lệ"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(voucher)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "User Id không hợp lệ"
        })
    }

    // B3: Thao tác với cơ sở dữ liệu
    const newVoucherHistory = {
        _id: mongoose.Types.ObjectId(),
        user: user,
        voucher: voucher
    }

    voucherHistoryModel.create(newVoucherHistory, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        } else {
            return response.status(201).json({
                status: "Create VoucherHistory Successfully",
                data: data
            })
        }

    })
}

const getVoucherHistoryById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const voucherHistoryId = request.params.historyId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(voucherHistoryId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "VoucherHistoryId không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    voucherHistoryModel.findById(voucherHistoryId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get detail voucherHistory successfully",
            data: data
        })
    })
}

const getAllVoucherHistory = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệu
    voucherHistoryModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get all voucherHistory successfully",
            data: data
        })
    })
}

const updateVoucherHistoryById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const voucherHistoryId = request.params.historyId;
    const body = request.body;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(voucherHistoryId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "VoucherHistoryId không hợp lệ"
        })
    }

    if (body.user !== undefined && (!mongoose.Types.ObjectId.isValid(body.user))) {
        return response.status(400).json({
            status: "Bad Request",
            message: "user không hợp lệ"
        })
    }

    if (body.voucher !== undefined && (!mongoose.Types.ObjectId.isValid(body.voucher))) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Voucher không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const updateVoucherHistory = {}

    if (body.user !== undefined) {
        updateVoucherHistory.user = body.user
    }

    if (body.voucher !== undefined) {
        updateVoucherHistory.voucher = body.voucher
    }

    voucherHistoryModel.findByIdAndUpdate(voucherHistoryId, updateVoucherHistory, (error, data) => {
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

const deleteVoucherHistoryById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const voucherHistoryId = request.params.historyId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(voucherHistoryId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucherHistory không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    voucherHistoryModel.findByIdAndDelete(voucherHistoryId, (error, data) => {
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
    getVoucherHistoryById: getVoucherHistoryById,
    createVoucherHistory: createVoucherHistory,
    getAllVoucherHistory: getAllVoucherHistory,
    updateVoucherHistoryById: updateVoucherHistoryById,
    deleteVoucherHistoryById: deleteVoucherHistoryById
}