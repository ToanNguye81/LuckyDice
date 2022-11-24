// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// Import prizeHistory middleware
const prizeHistoryMiddleware = require("../middlewares/prizeHistoryMiddleware.js");

//Import prizeHistory controller 
const prizeHistoryController = require("../controllers/prizeHistoryController");

router.get("/prize-histories", prizeHistoryMiddleware.getAllPrizeHistoryMiddleware, prizeHistoryController.getAllPrizeHistory)

router.post("/prize-histories", prizeHistoryMiddleware.createPrizeHistoryMiddleware, prizeHistoryController.createPrizeHistory);

router.get("/prize-histories/:prizeHistoryId", prizeHistoryMiddleware.getPrizeHistoryMiddleware, prizeHistoryController.getPrizeHistoryById);

router.put("/prize-histories/:prizeHistoryId", prizeHistoryMiddleware.updatePrizeHistoryMiddleware, prizeHistoryController.updatePrizeHistoryById)

router.delete("/prize-histories/:prizeHistoryId", prizeHistoryMiddleware.deletePrizeHistoryMiddleware, prizeHistoryController.deletePrizeHistoryById)

module.exports = router;