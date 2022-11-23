// Khai báo thư viện mongo
const mongoose = require("mongoose")

//Khai báo class Schema
const Schema = mongoose.Schema

//Khởi tạo instance diceHitorySchema 
const diceHistorySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dice: { type: Number, required: true },

}, {
    //Lưu dấu bảng ghi được cập nhật vào thời gian nào
    timestamps: true
})

// Biên dịch một Book Model từ bookscheme
module.exports = mongoose.model("DiceHistory", diceHistorySchema)