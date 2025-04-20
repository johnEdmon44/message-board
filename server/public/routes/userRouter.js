const {Router } = require("express");
const userRouter = Router();
const userController = require("../controller/UserController");


userRouter.get("/", userController.getUserList);

userRouter.get("/signup", userController.createUserGet);
userRouter.post("/signup", userController.createUserPost);

userRouter.post("/login", userController.userLoginPost);
userRouter.get("/login", userController.userLoginGet);

userRouter.get("/user", userController.userPageGet);
userRouter.get("/logout", userController.userLogoutGet);
module.exports = userRouter;