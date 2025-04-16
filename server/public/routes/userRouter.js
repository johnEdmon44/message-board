const {Router } = require("express");
const userRouter = Router();
const userController = require("../controller/UserController");


userRouter.get("/", userController.getUserList);

userRouter.get("/signup", userController.createUserGet);
userRouter.post("/signup", userController.createUserPost);

userRouter.post("/login", userController.userLoginPost);

module.exports = userRouter;