const { 
  getUserPaginate,
  getUsernames,
  createUser,
  deleteUser,
  updateUsername, 
} = require("../db/userQueries");

const bcrypt = require("bcryptjs");
const passport = require("passport");

// GET all usernames
async function getUserList(req, res) {
  try {
    const usernames = await getUsernames();
    return res.json({ usernames });
  } catch (err) {
    return res.status(500).send("Error fetching users");
  }
}

// POST create user
async function createUserPost(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    if (username.length > 20) {
      return res.status(400).json({ message: "Username must be 20 characters or fewer." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password too short" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await createUser(username, hashed);
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: "User already exist" });
    }
    res.status(500).json({ error: "Failed to create user", details: err.message });
  }
}


// POST login
async function userLoginPost(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Authentication error" });
    }

    if (!user) {
      return res.status(401).json({ error: info?.message || "Login failed" });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error session" });
      }

      res.status(200).json({
        message: "Login success",
        user: { id: user.id, username: user.username }
      });
    });
  })(req, res, next);
}


function userLogoutPost(req, res) {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logout successful" });
  });
}


async function userPageGet(req, res) {
  res.json({ user: req.user });
}


async function userDeletePost(req, res) {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(200).json({ message: "Delete success" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
}

// Change username
async function updateUserPost(req, res) {
  try {
    const { username } = req.body;
    const id = req.user.id;
    await updateUsername(id, username);
    res.status(200).json({ message: "Update success" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update username" });
  }
}


async function getPaginatedUsers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;

    const { users, totalUsers } = await getUserPaginate(page, limit);

    res.json({
      usernames: users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      totalUsers
    });
  } catch (error) {
    res.json({ error: "Error fetching paginated users" });
  }
}


module.exports = {
  getUserList,
  createUserPost,
  userLoginPost,
  userLogoutPost,
  userPageGet,
  userDeletePost,
  updateUserPost,
  getPaginatedUsers
};
