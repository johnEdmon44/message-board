const express = require("express");
const path = require("path");
const app = express();
const pagesRouter = require("./public/routes/Page");
const newRouter = require("./public/routes/new")

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "public", "views"));
app.set("view engine", "ejs");

app.use("/", pagesRouter);
app.use("/", newRouter);

const PORT = 3400;
app.listen(PORT, () => console.log(`server running at PORT: ${PORT}`));