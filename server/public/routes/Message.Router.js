const { Router } = require("express");
const messageRouter = Router();
const messageController = require('../controller/MessageController');


messageRouter.post("/postMessage", messageController.userMessagePost);
// messageRouter.get("/messages", messageController.messagesGet);
messageRouter.delete("/deleteMessage/:id", messageController.deleteMessagePost);
messageRouter.post("/editMessage/:id", messageController.editMessagePost);
messageRouter.get("/countMessage", messageController.countMessageGet);
messageRouter.get("/messages", messageController.getPaginatedMessages);
module.exports = messageRouter;
