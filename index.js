// Khai báo thư viên Express
const express = require("express");

// Khai báo thư viện Mongoose
const mongoose = require("mongoose");

// Khai báo cổng chạy app 
const port = 8000;

const path = require("path");

// Khởi tạo app express
const app = express();

// Cấu hình request đọc được body json
app.use(express.json());

// Khai báo router
const userRouter = require("./app/routers/userRouter");
const voucherRouter = require("./app/routers/voucherRouter");
const prizeRouter = require("./app/routers/prizeRouter");
const prizeHistoryRouter = require("./app/routers/prizeHistoryRouter");
const voucherHistoryRouter = require("./app/routers/voucherHistoryRouter");
const diceHistoryRouter = require("./app/routers/diceHistoryRouter");
const diceRouter = require("./app/routers/diceRouter");
//Tao csdl tren mongodb
mongoose.connect("mongodb://127.0.0.1:27017/CRUD_DiceProject", (error) => {
    if (error) throw error;
    console.log("Connect MongoDB successfully!");
})

// Khai báo APi dạng Get "/lucky-dice" sẽ chạy vào đây
app.get("/", (request, response) => {
    console.log(__dirname);
    //Chạy file HTML với đường dẫn / cần dòng 2
    response.sendFile(path.join(__dirname + "/views/index.html"));
})

//Để hiển thị ảnh cần thêm middleware static vào express
app.use(express.static(__dirname + "/views"))

app.use("/lucky-dice", userRouter);
app.use("/lucky-dice", voucherRouter);
app.use("/lucky-dice", prizeRouter);
app.use("/lucky-dice", prizeHistoryRouter);
app.use("/lucky-dice", voucherHistoryRouter);
app.use("/lucky-dice", diceHistoryRouter);
app.use("/lucky-dice", diceRouter);


// Chạy app trên cổng
app.listen(port, () => {
    console.log("App listening on port:", port);
})