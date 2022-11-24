// Khai báo thư viên Express
const express = require("express");

// Khai báo thư viện Mongoose
const mongoose = require("mongoose");

// // Import DiceHistory Model
// const prizeModel = require("./app/models/prizeModel");
// const voucherModel = require("./app/models/voucherModel");

// Khai báo cổng chạy app 
const port = 8000;

const path = require("path");

// Khởi tạo app express
const app = express();

// Cấu hình request đọc được body json
app.use(express.json());

// Khai báo router
const randomNumberRouter = require("./app/routers/randomNumberRouter");
app.use("/api", randomNumberRouter);
const userRouter = require("./app/routers/userRouter");
app.use("/api", userRouter);
const voucherRouter = require("./app/routers/voucherRouter");
app.use("/api", voucherRouter);
const prizeRouter = require("./app/routers/prizeRouter");
app.use("/api", prizeRouter);
const prizeHistoryRouter = require("./app/routers/prizeHistoryRouter");
app.use("/api", prizeHistoryRouter);
const voucherHistoryRouter = require("./app/routers/voucherHistoryRouter");
app.use("/api", voucherHistoryRouter);
const diceHistoryRouter = require("./app/routers/diceHistoryRouter");
app.use("/api", diceHistoryRouter);

//Tao csdl tren mongodb
mongoose.connect("mongodb://127.0.0.1:27017/CRUD_DiceProject", (error) => {
    if (error) throw error;
    console.log("Connect MongoDB successfully!");
})

// Khai báo APi dạng Get "/" sẽ chạy vào đây
app.get("/", (request, response) => {
    console.log(__dirname);
    //Chạy file HTML với đường dẫn / cần dòng 2
    response.sendFile(path.join(__dirname + "/views/index.html"));
})

//Để hiển thị ảnh cần thêm middleware static vào express
app.use(express.static(__dirname + "/views"))

// Chạy app trên cổng
app.listen(port, () => {
    console.log("App listening on port:", port);
})