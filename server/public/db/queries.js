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

async function updateUsername(id, username) {
  const { rows } = await pool.query("UPDATE users SET username = $1 WHERE id = $2 RETURNING id, username", [username, id]);
  return rows[0]
}

async function userMessage(user_id, message) {
  const { rows } = await pool.query("INSERT INTO messages (user_id, message) VALUES ($1, $2)", [user_id, message]);
  return rows[0];
}

async function messages() {
  const { rows } = await pool.query("SELECT username, message, messages.id, date FROM users JOIN messages ON users.id = messages.user_id ORDER BY date ASC LIMIT 15 ");
  return rows;
}


module.exports = {
  createUser,
  getUsernames,
  getUser,
  deleteUser,
  updateUsername,
  userMessage,
  messages
}