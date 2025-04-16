const { Pool } = require("pg");


module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  database: "message_board",
  password: "Johnedmon0998@",
  port: 5432
})