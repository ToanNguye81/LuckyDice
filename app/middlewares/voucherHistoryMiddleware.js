const getAllVoucherHistoryMiddleware = (request, response, next) => {
    console.log("Get ALL VoucherHistory Middleware");
    next();
}

const createVoucherHistoryMiddleware = (request, response, next) => {
    console.log("Create VoucherHistory Middleware");
    next();
}

const getVoucherHistoryMiddleware = (request, response, next) => {
    console.log("Get Detail VoucherHistory Middleware");
    next();
}

const updateVoucherHistoryMiddleware = (request, response, next) => {
    console.log("Update VoucherHistory Middleware");
    next();
}

const deleteVoucherHistoryMiddleware = (request, response, next) => {
    console.log("Delete VoucherHistory Middleware");
    next();
}

module.exports = {
    getAllVoucherHistoryMiddleware,
    createVoucherHistoryMiddleware,
    getVoucherHistoryMiddleware,
    updateVoucherHistoryMiddleware,
    deleteVoucherHistoryMiddleware
}