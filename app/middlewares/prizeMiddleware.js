const getAllPrizeMiddleware = (request, response, next) => {
    console.log("Get ALL Prize Middleware");
    next();
}

const createPrizeMiddleware = (request, response, next) => {
    console.log("Create Prize Middleware");
    next();
}

const getPrizeMiddleware = (request, response, next) => {
    console.log("Get Prize Middleware");
    next();
}

const updatePrizeMiddleware = (request, response, next) => {
    console.log("Update Prize Middleware");
    next();
}

const deletePrizeMiddleware = (request, response, next) => {
    console.log("Delete Prize Middleware");
    next();
}

module.exports = {
    getAllPrizeMiddleware,
    createPrizeMiddleware,
    getPrizeMiddleware,
    updatePrizeMiddleware,
    deletePrizeMiddleware
}