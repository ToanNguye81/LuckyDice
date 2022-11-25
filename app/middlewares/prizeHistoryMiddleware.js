const getAllPrizeHistoryMiddleware = (request, response, next) => {
    console.log("Get ALL PrizeHistory Middleware");
    next();
}

const createPrizeHistoryMiddleware = (request, response, next) => {
    console.log("Create PrizeHistory Middleware");
    next();
}

const getPrizeHistoryMiddleware = (request, response, next) => {
    console.log("Get Detail PrizeHistory Middleware");
    next();
}

const updatePrizeHistoryMiddleware = (request, response, next) => {
    console.log("Update PrizeHistory Middleware");
    next();
}

const deletePrizeHistoryMiddleware = (request, response, next) => {
    console.log("Delete PrizeHistory Middleware");
    next();
}

module.exports = {
    getAllPrizeHistoryMiddleware: getAllPrizeHistoryMiddleware,
    createPrizeHistoryMiddleware: createPrizeHistoryMiddleware,
    getPrizeHistoryMiddleware: getPrizeHistoryMiddleware,
    updatePrizeHistoryMiddleware: updatePrizeHistoryMiddleware,
    deletePrizeHistoryMiddleware: deletePrizeHistoryMiddleware
}