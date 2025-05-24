const express = require("express");
const app = express();
const userRouter = require("./public/routes/userRouter");
const passport = require("passport");
const session = require("express-session");
require("./public/db/passport-config");
const cors = require("cors");
const messageRouter = require("./public/routes/Message.Router");
require('dotenv').config();

const allowedOrigins = [
  "http://localhost:5173",
  "https://message-board-9hwd.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/message", messageRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server running at PORT: ${PORT}`));