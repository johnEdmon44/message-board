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

userRouter.post("/delete/:id", userController.userDeletePost);

userRouter.post("/updateUsername", userController.updateUserPost);

userRouter.post("/postMessage", userController.userMessagePost);
userRouter.get("/messages", userController.messagesGet);

userRouter.delete("/deleteMessage/:id", userController.deleteMessagePost);
module.exports = userRouter;