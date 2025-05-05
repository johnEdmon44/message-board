const { Router } = require("express");
const userRouter = Router();
const userController = require("../controller/UserController");


userRouter.get("/", userController.getUserList);
userRouter.post("/signup", userController.createUserPost);
userRouter.post("/login", userController.userLoginPost);
userRouter.get("/user", userController.userPageGet);
userRouter.post("/delete/:id", userController.userDeletePost);
userRouter.post("/updateUsername", userController.updateUserPost);
userRouter.post("/logout", userController.userLogoutPost);

module.exports = userRouter;