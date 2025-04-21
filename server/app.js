const express = require("express");
const path = require("path");
const app = express();
const userRouter = require("./public/routes/userRouter");
const passport = require("passport");
const session = require("express-session");
require("./public/db/passport-config");
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "public", "views"));
app.set("view engine", "ejs");


app.use(session({
  secret: "test-key",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", userRouter);

const PORT = 3400;
app.listen(PORT, () => console.log(`server running at PORT: ${PORT}`));