const User = require("../database/models/User");
const db = require("../database/models");

// Middleware para que detecte si hay usurio logueado

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
    let emailInCookie = req.cookies.userEmail;
    if (emailInCookie != undefined) {
      let userFromCookie = db.User.findOne({
        where: { email: emailInCookie },
      })
        .then({
          if(userFromCookie) {
            req.session.userLogged = userFromCookie;
          },
        })
        .catch(e => res.send(e));
    }
  }

  next();
}

module.exports = userLoggedMiddleware;
