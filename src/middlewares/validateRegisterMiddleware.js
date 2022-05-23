const { body } = require("express-validator");

module.exports = [
  body("first_name").notEmpty().withMessage("Tienes que escribir un nombre"),
  body("last_name").notEmpty().withMessage("Tienes que escribir un apellido"),
  body("email")
    .notEmpty()
    .withMessage("Tienes que escribir un correo electrónico")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo válido"),
  body("password").notEmpty().withMessage("Tienes que escribir una contraseña"),
  body("password_confirm")
    .notEmpty()
    .withMessage("Tienes que confirmar la contraseña"),
];
