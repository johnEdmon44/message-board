const {
  userMessage,
  messages,
  deleteMessage,
  editMessage,
  countMessage,
  getMessagesPaginate
} = require("../db/messageQueries");


async function userMessagePost(req, res) {
  try {
    const { message } = req.body;
    const user_id = req.session.user?.id;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Empty message" });
    }

    if(message.length > 255) {
      return res.status(400).json({ error: "Message too long" });
    }

    if(message.length <= 3) {
      return res.status(400).json({ error: "message too short" });
    }

    await userMessage(user_id, message);
    res.status(200).json({ message: "Message post success" });
  } catch (error) {
    res.status(500).json({ error: "Failed to post message" });
  }
}

async function messagesGet(req, res) {
  try {
    const allMessages = await messages();
    res.status(200).json({ messages: allMessages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}

async function deleteMessagePost(req, res) {
  try {
    const id = req.params.id;
    await deleteMessage(id);
    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
}

async function editMessagePost(req, res) {
  try {
    const { message } = req.body;
    const message_id = req.params.id;

    await editMessage(message_id, message);
    res.status(200).json({ message: "Edit success" });
  } catch (error) {
    res.status(500).json({ message: "Failed to edit message" });
  }
}

async function countMessageGet(req, res) {
  try {
    const response = await countMessage();
    res.status(200).json({ count: response });
  } catch (error) {
    res.status(500).json({ error: "Failed to count messages" });
  }
}


async function getPaginatedMessages(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    const { messages, totalMessages } = await getMessagesPaginate(page, limit);

    res.json({
      messages,
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: page,
    });
  } catch (error) {
    res.json({ error: "Error fetching paginated messages" });
  }
}


module.exports = {
  userMessagePost,
  messagesGet,
  deleteMessagePost,
  editMessagePost,
  countMessageGet,
  getPaginatedMessages
}