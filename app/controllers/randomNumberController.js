const getRandomNumber = (request, response) => {

    console.log("Call API GET DICE");
    let diceResult = Math.floor(6 * Math.random()) + 1;
    console.log(diceResult);
    console.log(typeof(diceResult))

    response.status(200).json({
        message: diceResult
    })

    return diceResult;
}

module.exports = {
    getRandomNumber,
}