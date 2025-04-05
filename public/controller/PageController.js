const { links } = require("../model/links");
const { messages } = require("../model/db");

module.exports = {
  getHomePage: (req, res) => res.render("index", { links, messages }),
  getDynamicPage: (req, res) => res.render("index", { links, page: req.params.page })
};