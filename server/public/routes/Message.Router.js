const { Router } = require("express");
const messageRouter = Router();
const messageController = require('../controller/messageController');


messageRouter.post("/postMessage", messageController.userMessagePost);
messageRouter.get("/messages", messageController.messagesGet);
messageRouter.delete("/deleteMessage/:id", messageController.deleteMessagePost);
messageRouter.post("/editMessage/:id", messageController.editMessagePost);

module.exports = messageRouter;
