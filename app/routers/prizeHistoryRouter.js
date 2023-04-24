// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// Import prizeHistory middleware
const {
    getAllPrizeHistoryMiddleware,
    createPrizeHistoryMiddleware,
    getPrizeHistoryMiddleware,
    updatePrizeHistoryMiddleware,
    deletePrizeHistoryMiddleware
} = require("../middlewares/prizeHistoryMiddleware.js");

//Import prizeHistory controller 
const {
    getAllPrizeHistory,
    createPrizeHistory,
    getPrizeHistoryById,
    updatePrizeHistoryById,
    deletePrizeHistoryById
} = require("../controllers/prizeHistoryController");

router.get("/prize-history", getAllPrizeHistoryMiddleware, getAllPrizeHistory)

router.post("/prize-histories", createPrizeHistoryMiddleware, createPrizeHistory);

router.get("/prize-histories/:historyId", getPrizeHistoryMiddleware, getPrizeHistoryById);

router.put("/prize-histories/:historyId", updatePrizeHistoryMiddleware, updatePrizeHistoryById)

router.delete("/prize-histories/:historyId", deletePrizeHistoryMiddleware, deletePrizeHistoryById)

module.exports = router;