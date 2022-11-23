const getRandomNumberMiddleware = (request, response, next) => {

    console.log("Current time: ", new Date());
    console.log("Request method: ", request.method);
    next();
}


module.exports = {
    getRandomNumberMiddleware,
}
onst diceHistoryController = require("../controllers/diceHistoryController");

router.get("/dice-histories", diceHistoryMiddleware.getAllDiceHistoryMiddleware, diceHistoryController.getAllDiceHistory)

router.post("/dice-histories", diceHistoryMiddleware.createDiceHistoryMiddleware, diceHistoryController.createDiceHistory);

router.get("/dice-histories/:diceHistoryId", diceHistoryMiddleware.getDiceHistoryMiddleware, diceHistoryController.getDiceHistoryById);

router.put("/dice-histories/:diceHistoryId", diceHistoryMiddleware.updateDiceHistoryMiddleware, diceHistoryController.updateDiceHistoryById)

router.delete("/dice-histories/:diceHistoryId", diceHistoryMiddleware.deleteDiceHistoryMiddleware, diceHistoryController.deleteDiceHistoryById)

module.exports = router;