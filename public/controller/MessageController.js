const { messages } = require("../model/db");
const { body, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 10 characters";

const validateUser = [
  body("name")
  .trim()
  .isAlpha()
  .withMessage(`user ${lengthErr}`),

  body("text")
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage(`Message ${lengthErr}`)
]

exports.handleMessageSubmission = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        links: require("../model/links").links,
        messages,
        errors: errors.array(),
        formData: req.body // Pass back entered data
      });
    }
    const { text, user } = req.body;
    messages.push({ text: text, user: user, added: new Date() });
    res.redirect("/");
  }
]