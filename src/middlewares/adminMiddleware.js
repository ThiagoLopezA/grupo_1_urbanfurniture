module.exports = (req, res, next) => {
  if (req.session.userLogged) {
    if (req.session.userLogged.access == 1) {
      next();
    }
  }
  res.redirect("/");
};
