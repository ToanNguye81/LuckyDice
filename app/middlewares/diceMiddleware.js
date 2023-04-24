

const getDiceMiddleware = (request, response, next) => {
    console.log("Get Dice Middleware");
    next();
}

module.exports = {
    getDiceMiddleware,
}