// Import thư viện Mongoose
const mongoose = require("mongoose");

// Import Module User Model
const userModel = require("../models/userModel");

const getAllUser = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    // B2: Validate dữ liệu
    // B3: Gọi Model tạo dữ liệ
    userModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get all User successfully",
            data: data
        })
    })
}

const createUser = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const body = request.body;
    // {
    // username: String, unique, required
    // firstname: String, required
    // lastname: String, required
    // createdAt: Date, default: Date.now()
    // updatedAt: Date, default: Date.now()
    // }

    // B2: Validate dữ liệu
    // Kiểm tra username có hợp lệ hay không
    if (!body.username) {
        return response.status(400).json({
            status: "Bad Request",
            message: "username không hợp lệ"
        })
    }

    //Kiểm tra firstname có hợp lệ không
    if (!body.firstname) {
        return response.status(400).json({
            status: "Bad Request",
            message: "firstname không hợp lệ"
        })
    }

    //Kiểm tra lastname có hợp lệ không
    if (!body.lastname) {
        return response.status(400).json({
            status: "Bad Request",
            message: "lastname không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    const newUser = {
        _id: mongoose.Types.ObjectId(),
        username: body.username,
        firstname: body.firstname,
        lastname: body.lastname,
    }

    userModel.create(newUser, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(201).json({
            status: "Create User successfully",
            data: data
        })
    })
}

const getUserById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const userId = request.params.userId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "userID không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    userModel.findById(userId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Get detail User successfully",
            data: data
        })
    })
}

const updateUserById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const userId = request.params.userId;
    const body = request.body;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "userID không hợp lệ"
        })
    }

    // Kiểm tra userName
    if (!body.userName) {
        return response.status(400).json({
            "status": "Error 400: bad request",
            "message": "userName is not valid!"
        });
    }
    // Kiểm tra firstName
    if (!body.firstName) {
        return response.status(400).json({
            "status": "Error 400: bad request",
            "message": "firstName is not valid!"
        });
    }
    // Kiểm tra lastName
    if (!body.lastName) {
        return response.status(400).json({
            "status": "Error 400: bad request",
            "message": "lastName is not valid!"
        });
    }

    // B3: Gọi Model update dữ liệu
    const updateUser = {
        userName: body.userName,
        firstName: body.firstName,
        lastName: body.lastName
    }

    userModel.findByIdAndUpdate(userId, updateUser, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        return response.status(200).json({
            status: "Update User successfully",
            data: data
        })
    })
}

const deleteUserById = (request, response) => {
    // B1: Chuẩn bị dữ liệu
    const userId = request.params.userId;

    // B2: Validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Bad Request",
            message: "userID không hợp lệ"
        })
    }

    // B3: Gọi Model tạo dữ liệu
    userModel.findByIdAndDelete(userId, (error, data) => {
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
    getAllUser,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
}