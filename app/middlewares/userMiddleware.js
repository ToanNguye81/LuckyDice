const getAllUserMiddleware = (request, response, next) => {
    console.log("Get ALL User Middleware");
    next();
}

const createUserMiddleware = (request, response, next) => {
    console.log("Create User Middleware");
    next();
}

const getUserMiddleware = (request, response, next) => {
    console.log("Get User Middleware");
    next();
}

const updateUserMiddleware = (request, response, next) => {
    console.log("Update User Middleware");
    next();
}

const deleteUserMiddleware = (request, response, next) => {
    console.log("Delete User Middleware");
    next();
}

module.exports = {
    getAllUserMiddleware,
    createUserMiddleware,
    getUserMiddleware,
    updateUserMiddleware,
    deleteUserMiddleware
}