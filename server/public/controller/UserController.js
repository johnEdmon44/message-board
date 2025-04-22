const { getUsernames, createUser, getUser, deleteUser } = require("../db/queries");
const bcrypt = require("bcryptjs");
const passport = require("passport");


async function getUserList(req, res) {
  try {
    const usernames = await getUsernames();
    res.json({ usernames });
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
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user", details: err.message });
  }
}


async function userLoginGet(req, res) {
  res.render("login");
}

async function userLoginPost(req, res, next) {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Authentication error" });
    }
    
    if (!user) {
      return res.status(401).json({ error: info.message || "Login failed" });
    }
    req.login(user, (err) => {
      if(err) {
        return res.status(500).json({ error: "Error session" });
      }

      return res.status(200).json({
        message: "Login success",
        user: { id: user.id, username: user.username }
      });
    });
  })(req, res, next)
}

async function userLogoutPost(req, res) {
  req.logout((err) => {
    if(err) return next(err);
    res.status(200).json({ message: "Logout successful" });
  });
}

async function userPageGet(req, res) {
  res.json({ user: req.user });
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
    res.status(200).json({ message: "Delete success" });
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