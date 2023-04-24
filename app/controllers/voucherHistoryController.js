// Import thư viện mongoose
const mongoose = require("mongoose");

// Import VoucherHistory Model
const voucherHistoryModel = require("../models/voucherHistoryModel");
const userModel = require("../models/userModel");


const createVoucherHistory = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const userId = request.body.userId;
    const voucherId = request.body.voucherId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "User Id không hợp lệ"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(voucherId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucherId không hợp lệ"
        })
    }

    // B3: Thao tác với cơ sở dữ liệu
    const newVoucherHistory = {
        _id: mongoose.Types.ObjectId(),
        user: userId,
        voucher: voucherId
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

// const getAllVoucherHistory = (request, response) => {
//     // B1: Chuẩn bị dữ liệu
//     let userId = req.query.user;

//     //tạo ra điều kiện lọc
//     let condition = {};

//     if (userId) {
//         condition.user = userId;
//     }
//     // B2: Validate dữ liệu
//     // B3: Gọi Model tạo dữ liệu
//     voucherHistoryModel
//         .find(condition)
//         .exec((error, data) => {
//             if (error) {
//                 return response.status(500).json({
//                     status: "Internal server error",
//                     message: error.message
//                 })
//             }

//             return response.status(200).json({
//                 status: "Get all voucherHistory successfully",
//                 data: data
//             })
//         })
// }

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

    if (body.userId !== undefined && (!mongoose.Types.ObjectId.isValid(body.userId))) {
        return response.status(400).json({
            status: "Bad Request",
            message: "userId không hợp lệ"
        })
    }

    if (body.voucherId !== undefined && (!mongoose.Types.ObjectId.isValid(body.voucherId))) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Voucher không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const updateVoucherHistory = {}

    if (body.userId !== undefined) {
        updateVoucherHistory.user = body.userId
    }

    if (body.voucherId !== undefined) {
        updateVoucherHistory.voucher = body.voucherId
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
            message: "historyId không hợp lệ"
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

//function find dice history by userName
const getAllVoucherHistory = async (request, response) => {
    //B1: chuẩn bị dữ liệu
    const userName = request.query.userName;

    // Sử dụng userModel tìm kiếm bằng userName
    try {
        const findUser = await userModel.findOne({ userName: userName }).exec()
        
        if (!findUser) {
            return response.status(404).json({
                status: `User ${userName} not found`,
                data: null
            })
        }

        const findDiceHistory = await voucherHistoryModel.find({ user: findUser._id }).exec()
        console.log(findDiceHistory)
        const voucherArray = findDiceHistory.map(item => item.voucher);
        console.log(voucherArray)
        return response.status(200).json({
            status: `Get all voucher of ${userName} success`,
            data: voucherArray
        })

    } catch (error) {
        return response.status(500).json({
            status: "Internal server error",
            message: error.message
        })
    }
}


module.exports = {
    getVoucherHistoryById: getVoucherHistoryById,
    createVoucherHistory: createVoucherHistory,
    getAllVoucherHistory: getAllVoucherHistory,
    updateVoucherHistoryById: updateVoucherHistoryById,
    deleteVoucherHistoryById: deleteVoucherHistoryById
}