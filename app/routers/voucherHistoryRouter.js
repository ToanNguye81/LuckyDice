// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// Import voucherHistory middleware
const {
    getAllVoucherHistoryMiddleware,
    createVoucherHistoryMiddleware,
    getVoucherHistoryMiddleware,
    updateVoucherHistoryMiddleware,
    deleteVoucherHistoryMiddleware
} = require("../middlewares/voucherHistoryMiddleware.js");

//Import voucherHistory controller 
const {
    getVoucherHistoryById,
    createVoucherHistory,
    getAllVoucherHistory,
    updateVoucherHistoryById,
    deleteVoucherHistoryById
} = require("../controllers/voucherHistoryController");

router.get("/voucher-histories", getAllVoucherHistoryMiddleware, getAllVoucherHistory)

router.post("/voucher-histories", createVoucherHistoryMiddleware, createVoucherHistory);

router.get("/voucher-histories/:historyId", getVoucherHistoryMiddleware, getVoucherHistoryById);

router.put("/voucher-histories/:historyId", updateVoucherHistoryMiddleware, updateVoucherHistoryById)

router.delete("/voucher-histories/:historyId", deleteVoucherHistoryMiddleware, deleteVoucherHistoryById)

module.exports = router;