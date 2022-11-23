const getRandomNumberMiddleware = (request, response, next) => {

    console.log("Current time: ", new Date());
    console.log("Request method: ", request.method);
    next();
}


module.exports = {
    getRandomNumberMiddleware,

}