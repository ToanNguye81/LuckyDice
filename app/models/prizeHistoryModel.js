// Khai báo thư viện mongo
const mongoose = require("mongoose")

//Khai báo class Schema
const Schema = mongoose.Schema

//Khởi tạo instance prizeHitorySchema 
const prizeHistorySchema = new Schema({
    user: { type: Schema.Types.ObjectID, ref: "User", required: true },
    prize: { type: Schema.Types.ObjectID, ref: "Prize", required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
}, {
    //Lưu dấu bảng ghi được cập nhật vào thời gian nào
    timestamps: true
})

// Biên dịch một Book Model từ bookscheme
module.exports = mongoose.model("PrizeHistory", prizeHistorySchema)