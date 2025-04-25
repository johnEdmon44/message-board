const { getUsernames, createUser, getUser, deleteUser, updateUsername, userMessage, messages, deleteMessage } = require("../db/queries");
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

async function updateUserPost(req, res) {
  try {
    const { username } = req.body;
    const id = req.user.id
    await updateUsername(id, username);
    res.status(200).json({ message: "Update success" });
  } catch(error) {
    throw error;
  }
}

async function userMessagePost(req, res) {
  try {
    const { message } = req.body;
    const  user_id  = req.user.id;

    await userMessage(user_id, message);
    res.status(200).json({ message: "Message post success" });
  } catch(error) {
    throw error;
  }
}

async function messagesGet(req, res) {
  try {
    const allMessages = await messages();
    res.status(200).json({ messages: allMessages });
  } catch(error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}

async function deleteMessagePost(req, res) {
  const id = req.params.id;
  try {
    await deleteMessage(id);
    res.status(200).json({ message: "message deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
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
  userDeletePost,
  updateUserPost,
  userMessagePost,
  messagesGet,
  deleteMessagePost
}