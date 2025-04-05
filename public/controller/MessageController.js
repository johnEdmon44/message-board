const { messages } = require("../model/db");

module.exports = {
  handleMessageSubmission: (req, res) => {
    const { text, user } = req.body;

    messages.push({ text: text, user: user, added: new Date() });

    res.redirect("/");
  }
}