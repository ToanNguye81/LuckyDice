// Import thu viện express
const express = require('express');

// Khai báo router app
const router = express.Router();

// Import diceController
const diceController = require("../controllers/diceController");
// Import prize middleware
const prizeMiddleware = require("../middlewares/prizeMiddleware");

router.post("/dice", prizeMiddleware.createPrizeMiddleware, diceController.diceHandler);

module.exports = router;