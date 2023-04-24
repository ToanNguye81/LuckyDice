// Import thu viện express
const express = require('express');

// Khai báo router app
const router = express.Router();

// Import diceController
const diceController = require("../controllers/diceController");
// Import dice middleware
const diceMiddleware = require("../middlewares/diceMiddleware");

router.post("/dice", diceMiddleware.getDiceMiddleware, diceController.diceHandler);

module.exports = router;