// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// Import RandomNumber middleware
const randomNumberMiddleware = require("../middlewares/randomNumberMilddleware");

// Import randomNumber controller
const randomNumberController = require("../controllers/randomNumberController")

router.get("/random-number", randomNumberMiddleware.getRandomNumberMiddleware, randomNumberController.getRandomNumber)

module.exports = router;