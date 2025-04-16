const express = require("express");
const path = require("path");
const app = express();
const navRouter = require("./public/routes/Page");
const userRouter = require("./public/routes/userRouter");

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "public", "views"));
app.set("view engine", "ejs");

app.use("/", userRouter);
app.use("/", navRouter);

const PORT = 3400;
app.listen(PORT, () => console.log(`server running at PORT: ${PORT}`));