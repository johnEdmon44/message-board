const express = require("express");
const app = express();
const userRouter = require("./public/routes/userRouter");
const passport = require("passport");
const session = require("express-session");
require("./public/db/passport-config");
const cors = require("cors");
const messageRouter = require("./public/routes/Message.Router");

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "test-key",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/message", messageRouter);

const PORT = 3400;
app.listen(PORT, () => console.log(`server running at PORT: ${PORT}`));