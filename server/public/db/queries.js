const pool = require("./pool");

async function createUser( username, password) {
  await pool.query("INSERT INTO users ( username, password) VALUES ($1, $2)", [username, password]);
}

//get user list
async function getUsernames() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

// get user or login
async function getUser(username) {
  const { rows } = await pool.query("SELECT id, username FROM users WHERE username = $1", [username]);
  return rows[0];
}

async function deleteUser(id) {
  const { rows } = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return rows;
}


module.exports = {
  createUser,
  getUsernames,
  getUser,
  deleteUser
}