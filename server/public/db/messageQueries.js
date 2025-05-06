const pool = require("./pool");


async function userMessage(user_id, message) {
  const { rows } = await pool.query("INSERT INTO messages (user_id, message) VALUES ($1, $2)", [user_id, message]);
  return rows[0];
}

async function messages() {
  const { rows } = await pool.query("SELECT username, message, messages.id, user_id, edited, date FROM users JOIN messages ON users.id = messages.user_id ORDER BY date ASC");
  return rows;
}

async function countMessage() {
  const { rows } = await pool.query("SELECT users.id, COUNT(messages.message) FROM users INNER JOIN messages ON users.id = messages.user_id GROUP BY users.id");
  return rows;
}

async function deleteMessage(id) {
  const { rows } = await pool.query("DELETE FROM messages WHERE id = $1", [id]);
  return rows;
}

async function editMessage(id, newMessage) {
  const { rows } = await pool.query("UPDATE messages SET message = $1, edited = TRUE WHERE id = $2", [newMessage, id]);
  return rows[0];
}


module.exports = {
  userMessage,
  messages,
  deleteMessage,
  editMessage,
  countMessage
}