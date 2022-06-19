const { validationResult } = require("express-validator");
const db = require("../database/models");
const bcryptjs = require("bcryptjs");

const userController = {
  login: (req, res) => {
    return res.render("users/login");
  },
  loginProcess: (req, res) => {
    // Traigo los posibles errores
    const resultValidation = validationResult(req);
    // Si hay errores, envío la vista de login con los mensajes de error
    if (resultValidation.errors.length > 0) {
      return res.render("users/login", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    // Si el usuario está en la DB lo guardo, sino guarda undefined. Chequeo por el email
    let userToLogin = db.User.findOne({
      where: { email: req.body.email },
    })
      .then(user => {
        if (user) {
          // Compara contraseñas
          let isOkThePassword = bcryptjs.compareSync(
            req.body.password,
            user.password
          );
          // Caso contraseña correcta
          if (isOkThePassword) {
            delete user.password; // elimino la propiedad password de la session por seguridad
            req.session.userLogged = user; // el usuario de la session es el usuario que se logueó
            if (req.body.remember_user == "on") {
              //  Configuro la cookie y la valido si esta tildado el checkbox
              res.cookie("userEmail", req.session.userLogged.email, {
                maxAge: 1000 * 60 * 20,
              });
            }
            return res.redirect("/");
          } else {
            return res.render("users/login", {
              // ejecuta en caso de que la comparación de password dio false
              errors: {
                email: {
                  msg: "Las credenciales son inválidas",
                },
              },
            });
          }
        } else {
          return res.render("users/login", {
            // ejecuta si userToLogin == undefined
            errors: {
              email: {
                msg: "El email ingresado no se encuentra registrado",
              },
            },
          });
        }
      })
      .catch(e => res.send(e));
  },
  register: (req, res) => {
    return res.render("users/register");
  },
  registerProcess: (req, res) => {
    // Traigo los posibles errores
    const resultValidation = validationResult(req);

    // Si hay errores, envío la vista de registro con los mensajes de error
    if (resultValidation.errors.length > 0) {
      return res.render("users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    // Verifico si el usuario ya está en la base de datos
    let userInDB = db.User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) {
          // Si encuentra que ya hay un usuario con ese email, envío msg de error
          res.render("users/register", {
            errors: {
              email: {
                msg: "Ya se encuentra registrado un usuario con este email",
              },
            },
            oldData: req.body,
          });
        } else if (req.body.password !== req.body.password_confirm) {
          // Verifico que la password y el confirm coincidan
          return res.render("users/register", {
            oldData: req.body,
            errors: {
              password: {
                msg: "Las contraseñas no coinciden",
              },
            },
          });
        } else {
          // Creo un nuevo usuario con los datos que llegan del body y hasheo el password
          let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            access: "0",
            phone: "",
            dni: "",
            street: "",
            street_number: "",
            floor: "",
            apartment: "",
            province: "",
            town: "",
            CP: "",
          };
          db.User.create(userToCreate);
          return res.redirect("login");
        }
      })
      .catch(e => res.send(e));
  },
  logout: (req, res) => {
    res.clearCookie("userEmail"); //para eliminar la cookies
    req.session.destroy();
    return res.redirect("/");
  },
  config: (req, res) => {
    let provinces = [
      "Buenos Aires",
      "Capital Federal",
      "Catamarca",
      "Chaco",
      "Chubut",
      "Córdoba",
      "Corrientes",
      "Entre Ríos",
      "Formosa",
      "Gran Bs As Norte",
      "Gran Bs As Oeste",
      "Gran Bs As Sur",
      "Jujuy",
      "La Pampa",
      "La Rioja",
      "Mendoza",
      "Misiones",
      "Neuquen",
      "Rio Negro",
      "Salta",
      "San Juan",
      "San Luis",
      "Santa Cruz",
      "Santa Fé",
      "Santiago del Estero",
      "Tierra del Fuego",
      "Tucumán",
    ];
    res.render("users/config", {
      user: req.session.userLogged,
      provinces: provinces,
    });
  },
};
module.exports = userController;
