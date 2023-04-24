// Import thư viện Mongoose
const mongoose = require("mongoose");

// Import Module Voucher Model
const voucherModel = require("../models/voucherModel");

const getAllVoucher = (request, response) => {
    // B3: Gọi Model tạo dữ liệ
    voucherModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(200).json({
            status: "Get all Voucher successfully",
            data: data
        })
    })
}

const createVoucher = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const body = request.body;

    // B2: Validate dữ liệu
    // Kiểm tra code có hợp lệ hay không
    if (!body.code) {
        return response.status(400).json({
            status: "Bad Request",
            message: "code không hợp lệ"
        })
    }

    //Kiểm tra discount có hợp lệ không
    if (!(isNaN(body.discount) == false && body.discount > 0)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "discount không hợp lệ"
        })
    }

    // Kiểm tra note
    if (!body.note) {
        return response.status(400).json({
            "status": "Error 400: bad request",
            "message": "note is not valid!"
        });
    }

    // B3: Gọi Model tạo dữ liệu
    const newVoucher = {
        _id: mongoose.Types.ObjectId(),
        code: body.code,
        discount: body.discount,
        note: body.note
    }

    voucherModel.create(newVoucher, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Create Voucher successfully",
            data: data
        })
    })
}

const getVoucherById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const voucherId = request.params.voucherId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(voucherId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucherId không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    voucherModel.findById(voucherId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get detail Voucher successfully",
            data: data
        })
    })
}

const updateVoucherById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const voucherId = request.params.voucherId;
    const body = request.body;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(voucherId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucherId không hợp lệ"
        })
    }

    if (body.code !== undefined && body.code.trim() === "") {
        return response.status(400).json({
            status: "Bad Request",
            message: "code không hợp lệ"
        })
    }

    // Kiểm tra discount
    if (!body.discount) {
        return response.status(400).json({
            "status": "Error 400: bad request",
            "message": "discount is not valid!"
        });
    }

    // B3: Gọi Model update dữ liệu
    const updateVoucher = {}

    if (body.code !== undefined) {
        updateVoucher.code = body.code
    }

    if (body.discount !== undefined) {
        updateVoucher.discount = body.discount
    }

    if (body.note !== undefined) {
        updateVoucher.note = body.note
    }

    voucherModel.findByIdAndUpdate(voucherId, updateVoucher, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        return response.status(200).json({
            status: "Update Voucher successfully",
            data: data
        })
    })
}

const deleteVoucherById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const voucherId = request.params.voucherId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(voucherId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "voucherId không hợp lệ"
        })
    }
    // B3: Gọi Model tạo dữ liệu
    voucherModel.findByIdAndDelete(voucherId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Delete Voucher successfully"
        })
    })
}

module.exports = {
    getAllVoucher,
    createVoucher,
    getVoucherById,
    updateVoucherById,
    deleteVoucherById
}