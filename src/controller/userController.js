const fs = require("fs");
const path = require("path");
const userFilePath = path.join(__dirname, "../data/user.json");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");

const userController = {
  getdatos: () => {
    return JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
  },
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
    let userToLogin = User.findByField("email", req.body.email);

    if (userToLogin) {
      // entra al if sólo si pudo guardar un usuario
      let isOkThePassword = bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (isOkThePassword) {
        delete userToLogin.password; // elimino la propiedad password de la session por seguridad
        req.session.userLogged = userToLogin; // el usuario de la session es el usuario que se logueó

        //  Configuro la cookie y la valido si esta tildado el checkbox
        if (req.body.remember_user == "on") {
          res.cookie("userEmail", req.session.userLogged.email, {
            maxAge: 1000 * 60 * 20,
          });
        }

        return res.redirect("/");
      }

      return res.render("users/login", {
        // ejecuta en caso de que la comparación de password dio false
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
    }

    return res.render("users/login", {
      // ejecuta si userToLogin == undefined
      errors: {
        email: {
          msg: "El email ingresado no se encuentra registrado",
        },
      },
    });
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
    let userInDB = User.findByField("email", req.body.email);

    // Si encuentra que ya hay un usuario con ese email, envío msg de error
    if (userInDB) {
      return res.render("users/register", {
        errors: {
          email: {
            msg: "Ya se encuentra registrado un usuario con este email",
          },
        },
        oldData: req.body,
      });
    }
    // Verifico que la password y el confirm coincidan
    if (req.body.password !== req.body.password_confirm) {
      return res.render("users/register", {
        // errors: resultValidation.mapped(),
        oldData: req.body,
        errors: {
          password: {
            msg: "Las contraseñas no coinciden",
          },
        },
      });
    }

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

    User.create(userToCreate);
    return res.redirect("login");
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
