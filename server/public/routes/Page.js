const express = require("express");
const router = express.Router();
const pageController = require("../controller/PageController");

router.get("/", pageController.getHome);
router.get("/about", pageController.getAbout);
router.get("/signup", pageController.getSignup);
router.get("/login", pageController.getLogin);

module.exports = router;