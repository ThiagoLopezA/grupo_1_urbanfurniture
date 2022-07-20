// Este middleware está para que si un usuario está logueado no pueda volver a loguearse o registrarse
// Primero debe hacer logout

function guestMiddleware(req, res, next) {
  if (req.session.userLogged) {
    res.redirect("/"); // debería ir a la vista /user/profile -> hay que crearla
  }
  next();
}

module.exports = guestMiddleware;
