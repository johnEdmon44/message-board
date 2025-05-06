const pool = require("./pool");


async function getUserPaginate(page, limit) {
  const offset = (page - 1) * limit;

  const getUsersQuery = await pool.query("SELECT id, username FROM users LIMIT $1 OFFSET $2", [limit, offset]);
  const countUsersQuery = await pool.query("SELECT COUNT(*) FROM users");

  const users = getUsersQuery.rows;
  const totalUsers = parseInt(countUsersQuery.rows[0].count);

  return {
    users,
    totalUsers
  }
}

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


module.exports = {
  getUserPaginate,
  createUser,
  getUsernames,
  getUser,
  deleteUser,
  updateUsername,
}