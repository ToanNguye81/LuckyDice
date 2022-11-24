// Khai báo thư viện mongo
const mongoose = require("mongoose")

//Khai báo class Schema
const Schema = mongoose.Schema

//Khởi tạo instance voucherHitorySchema 
const voucherHistorySchema = new Schema({
    user: { type: Schema.Types.ObjectID, ref: "User", required: true },
    voucher: { type: Schema.Types.ObjectID, ref: "Voucher", required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
}, {
    //Lưu dấu bảng ghi được cập nhật vào thời gian nào
    timestamps: true
})

// Biên dịch một Book Model từ bookscheme
module.exports = mongoose.model("VoucherHistory", voucherHistorySchema)