// Import thư viện Mongoose
const mongoose = require("mongoose");

// Import Module Prize Model
const prizeModel = require("../models/prizeModel");

const getAllPrize = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệ
    prizeModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get all Prize successfully",
            data: data
        })
    })
}

const createPrize = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const body = request.body;
    // {
    // name: String, unique, required
    // }

    // B2: Validate dữ liệu
    // Kiểm tra name có hợp lệ hay không
    if (!body.name) {
        return response.status(400).json({
            status: "Bad Request",
            message: "name không hợp lệ"
        })
    }

    if (!body.description) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Description is not valid!"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const newPrize = {
        _id: mongoose.Types.ObjectId(),
        name: body.name,
        description: body.description
    }

    prizeModel.create(newPrize, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Create Prize successfully",
            data: data
        })
    })
}

const getPrizeById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const prizeId = request.params.prizeId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(prizeId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "prizeID không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    prizeModel.findById(prizeId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get detail Prize successfully",
            data: data
        })
    })
}

const updatePrizeById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const prizeId = request.params.prizeId;
    const body = request.body;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(prizeId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "prizeID không hợp lệ"
        })
    }

    if (!body.name) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Name is not valid!"
        })
    }

    if (!body.description) {
        return response.status(400).json({
            status: "Bad Request",
            message: "Description is not valid!"
        })
    }


    // B3: Gọi Model update dữ liệu
    const updatePrize = {
        name: body.name,
        description: body.description
    }

    prizeModel.findByIdAndUpdate(prizeId, updatePrize, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Update Prize successfully",
            data: data
        })
    })
}

const deletePrizeById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const prizeId = request.params.prizeId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(prizeId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "prizeID không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    prizeModel.findByIdAndDelete(prizeId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Delete Prize successfully"
        })
    })
}

module.exports = {
    getAllPrize,
    createPrize,
    getPrizeById,
    updatePrizeById,
    deletePrizeById
}