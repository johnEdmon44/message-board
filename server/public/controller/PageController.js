exports.getHome = (req, res) => {
  res.render("index");
}

exports.getAbout = (req, res) => {
  res.render("about");
}

exports.getLogin = (req, res) => {
  res.render("login");
}

exports.getSignup = (req, res) => {
  res.render("signup");
}