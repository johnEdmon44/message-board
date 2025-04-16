const pool = require("./pool");

async function createUser( username, password) {
  await pool.query("INSERT INTO users ( username, password) VALUES ($1, crypt($2, gen_salt('bf', 10)))", [username, password]);
}

//get user list
async function getUsernames() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

// get user or login
async function getUser(username, password) {
  const { rows } = await pool.query("SELECT id, username FROM users WHERE username = $1 AND password = crypt($2, password)", [username, password]);
  return rows[0];
}


module.exports = {
  createUser,
  getUsernames,
  getUser
}