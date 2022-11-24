// Khai báo thư viện ExpressJS
const express = require("express");

// Khai báo router app
const router = express.Router();

// Import prize middleware
const prizeMiddleware = require("../middlewares/prizeMiddleware");

// Import course controller
const prizeController = require("../controllers/prizeController")

router.get("/prizes", prizeMiddleware.getAllPrizeMiddleware, prizeController.getAllPrize)

router.post("/prizes", prizeMiddleware.createPrizeMiddleware, prizeController.createPrize)

router.get("/prizes/:prizeId", prizeMiddleware.getPrizeMiddleware, prizeController.getPrizeById)

router.put("/prizes/:prizeId", prizeMiddleware.updatePrizeMiddleware, prizeController.updatePrizeById)

router.delete("/prizes/:prizeId", prizeMiddleware.deletePrizeMiddleware, prizeController.deletePrizeById)

module.exports = router;