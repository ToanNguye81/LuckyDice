// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// Import voucherHistory middleware
const voucherHistoryMiddleware = require("../middlewares/voucherHistoryMiddleware.js");

//Import voucherHistory controller 
const voucherHistoryController = require("../controllers/voucherHistoryController");

router.get("/voucher-histories", voucherHistoryMiddleware.getAllVoucherHistoryMiddleware, voucherHistoryController.getAllVoucherHistory)

router.post("/voucher-histories", voucherHistoryMiddleware.createVoucherHistoryMiddleware, voucherHistoryController.createVoucherHistory);

router.get("/voucher-histories/:voucherHistoryId", voucherHistoryMiddleware.getVoucherHistoryMiddleware, voucherHistoryController.getVoucherHistoryById);

router.put("/voucher-histories/:voucherHistoryId", voucherHistoryMiddleware.updateVoucherHistoryMiddleware, voucherHistoryController.updateVoucherHistoryById)

router.delete("/voucher-histories/:voucherHistoryId", voucherHistoryMiddleware.deleteVoucherHistoryMiddleware, voucherHistoryController.deleteVoucherHistoryById)

module.exports = router;