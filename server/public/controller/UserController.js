const { getUsernames, createUser, getUser, deleteUser } = require("../db/queries");
const bcrypt = require("bcryptjs");
const passport = require("passport");


async function getUserList(req, res) {
  try {
    const usernames = await getUsernames();
    res.render("index", { usernames });
    console.log({ usernames });
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
}

async function createUserGet(req, res) {
  res.render("signup");
}

// SIGNUP
async function createUserPost(req, res) {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await createUser( username, hashed);
    res.redirect("/login")
  } catch (err) {
    throw err;
  }
}


async function userLoginGet(req, res) {
  res.render("login");
}

async function userLoginPost(req, res, next) {
  passport.authenticate('local', {
    successRedirect: ("user"),
    failureRedirect: ("login"),
  })(req, res, next)
}

async function userLogoutPost(req, res) {
  req.logout((err) => {
    if(err) {
      return next(err);
    }
    res.redirect("/");
  })
}

async function userPageGet(req, res) {
  res.render("user", { user: req.user });
}


async function userLogoutGet(req, res, next){
  req.logout(err => {
    return next(err);
  })
  res.redirect("login");
}

async function userDeletePost(req, res) {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.render("login");
  } catch(error) {
    throw error
  }
}

module.exports = {
  getUserList,
  createUserPost,
  createUserGet,
  userLoginPost,
  userLogoutPost,
  userLoginGet,
  userPageGet,
  userLogoutGet,
  userDeletePost
}