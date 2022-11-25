// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// Import newDice controller
const { diceHandler } = require("../controllers/diceController")

router.post("/devcamp-lucky-dice/dice", diceHandler)

module.exports = router;