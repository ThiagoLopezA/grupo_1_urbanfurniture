const User = require("../models/User");

// Middleware para que detecte si hay usurio logueado

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
	console.log(req.headers)
    let emailInCookie = req.cookies.userEmail;
	console.log(emailInCookie)

    let userFromCookie = User.findByField('email', emailInCookie);
    if (userFromCookie) {
      req.session.userLogged = userFromCookie;
    }
  }

  next();
}

module.exports = userLoggedMiddleware;
