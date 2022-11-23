const getAllDiceHistoryMiddleware = (request, response, next) => {
    console.log("Get ALL DiceHistory Middleware");
    next();
}

const createDiceHistoryMiddleware = (request, response, next) => {
    console.log("Create DiceHistory Middleware");
    next();
}

const getDiceHistoryMiddleware = (request, response, next) => {
    console.log("Get Detail DiceHistory Middleware");
    next();
}

const updateDiceHistoryMiddleware = (request, response, next) => {
    console.log("Update DiceHistory Middleware");
    next();
}

const deleteDiceHistoryMiddleware = (request, response, next) => {
    console.log("Delete DiceHistory Middleware");
    next();
}

module.exports = {
    getAllDiceHistoryMiddleware,
    createDiceHistoryMiddleware,
    getDiceHistoryMiddleware,
    updateDiceHistoryMiddleware,
    deleteDiceHistoryMiddleware
}