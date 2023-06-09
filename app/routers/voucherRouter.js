// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// Import voucher middleware
const voucherMiddleware = require("../middlewares/voucherMiddleware");

// Import course controller
const voucherController = require("../controllers/voucherController")

router.get("/vouchers", voucherMiddleware.getAllVoucherMiddleware, voucherController.getAllVoucher)

router.post("/vouchers", voucherMiddleware.createVoucherMiddleware, voucherController.createVoucher)

router.get("/vouchers/:voucherId", voucherMiddleware.getVoucherMiddleware, voucherController.getVoucherById)

router.put("/vouchers/:voucherId", voucherMiddleware.updateVoucherMiddleware, voucherController.updateVoucherById)

router.delete("/vouchers/:voucherId", voucherMiddleware.deleteVoucherMiddleware, voucherController.deleteVoucherById)

module.exports = router;