const express = require("express");
const router = express.Router();
const { getHomePage, getDynamicPage } = require("../controller/PageController");

router.get("/", getHomePage);
router.get("/:page", getDynamicPage);

module.exports = router;