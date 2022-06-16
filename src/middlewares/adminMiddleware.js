module.exports = (req, res, next) => {
  if (req.session.hasOwnProperty("userLogged")) {
    if (req.session.userLogged.access == 1) {
      next();
    }
  } else {
    res.redirect("/");
  }
};
