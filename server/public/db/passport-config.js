const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require("bcryptjs")
const pool = require("./pool");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if(!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if(!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];
    if (!user) {
      return done(null, false); 
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});