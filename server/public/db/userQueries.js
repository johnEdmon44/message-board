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

module.exports = {
  getUserPaginate
}