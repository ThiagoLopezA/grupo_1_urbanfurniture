// Middleware para que detecte si hay usurio logueado
const fetch = require("node-fetch");
const { APIURL } = require("../config");

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
    let emailInCookie = req.cookies.userEmail;
    if (emailInCookie != undefined) {
      fetch(`${APIURL}/users/email/${emailInCookie}`)
        .then(user => {
          if (user.status == 200) {
            req.session.userLogged = user.user;
          }
        })
        .catch(e => console.log(e));
      /*
      let userFromCookie = db.User.findOne({
        where: { email: emailInCookie },
      })
        .then({
          if(userFromCookie) {
            req.session.userLogged = userFromCookie;
          },
        })
        .catch(e => res.send(e));
        */
    }
  }

  next();
}

module.exports = userLoggedMiddleware;
