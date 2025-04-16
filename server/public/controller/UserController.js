const { getUsernames, createUser } = require("../db/queries");


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


module.exports = {
  getUserList,
  createUserPost,
  createUserGet
}