const { getUsernames, createUser, getUser } = require("../db/queries");


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


async function createUserPost(req, res) {
  const { username, password } = req.body;
  try {
    await createUser( username, password);
    res.redirect("/login")
  } catch (err) {
    throw err;
  }
}


async function userLoginPost(req, res) {
  const { username, password } = req.body;
  try {
    const user = await getUser(username, password);
    res.render("user", { user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
}


module.exports = {
  getUserList,
  createUserPost,
  createUserGet,
  userLoginPost
}