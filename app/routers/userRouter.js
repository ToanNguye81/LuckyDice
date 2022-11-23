// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// Import user middleware
const userMiddleware = require("../middlewares/userMiddleware");

// Import course controller
const userController = require("../controllers/userController")

router.get("/users", userMiddleware.getAllUserMiddleware, userController.getAllUser)

router.post("/users", userMiddleware.createUserMiddleware, userController.createUser)

router.get("/users/:userId", userMiddleware.getUserMiddleware, userController.getUserById)

router.put("/users/:userId", userMiddleware.updateUserMiddleware, userController.updateUserById)

router.delete("/users/:userId", userMiddleware.deleteUserMiddleware, userController.deleteUserById)

module.exports = router;