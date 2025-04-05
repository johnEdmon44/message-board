const express = require("express");
const router = express.Router();
const messageController = require("../controller/MessageController");

router.post("/new", messageController.handleMessageSubmission);

module.exports = router;