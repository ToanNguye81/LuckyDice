// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// Import diceHistory middleware
const diceHistoryMiddleware = require("../middlewares/diceHistoryMiddleware.js");

//Import diceHistory controller 
const diceHistoryController = require("../controllers/diceHistoryController");

router.get("/dice-histories", diceHistoryMiddleware.getAllDiceHistoryMiddleware, diceHistoryController.getAllDiceHistory)

router.post("/dice-histories", diceHistoryMiddleware.createDiceHistoryMiddleware, diceHistoryController.createDiceHistory);

router.get("/dice-histories/:diceHistoryId", diceHistoryMiddleware.getDiceHistoryMiddleware, diceHistoryController.getDiceHistoryById);

router.put("/dice-histories/:diceHistoryId", diceHistoryMiddleware.updateDiceHistoryMiddleware, diceHistoryController.updateDiceHistoryById)

router.delete("/dice-histories/:diceHistoryId", diceHistoryMiddleware.deleteDiceHistoryMiddleware, diceHistoryController.deleteDiceHistoryById)

router.get("/dice-history", diceHistoryController.getDiceHistoryByUsername)

module.exports = router;