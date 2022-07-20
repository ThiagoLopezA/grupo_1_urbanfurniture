module.exports = (req, res, next) => {
  if (req.session.hasOwnProperty("userLogged")) {
    next();
  } else {
    res.redirect("/");
  }
};
