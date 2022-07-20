const db = require("../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
module.exports = {
  getUsers: async (req, res) => {
    try {
      let users = await db.User.findAll();
      res.status(200).json({
        count: users.length,
        users,
      });
    } catch (e) {
      res.status(500).json({
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
  getUserById: async (req, res) => {
    try {
      let user = await db.User.findOne({ where: { idusers: req.params.id } });
      res.status(200).json({
        status: 200,
        user,
      });
    } catch (e) {
      res.status(500).json({
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
  getUserByEmail: async (req, res) => {
    try {
      let user = await db.User.findOne({ where: { email: req.params.email } });
      if (user) {
        res.status(200).json({
          status: 200,
          user: user,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "No se encontro",
        });
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
  getUsersByName: async (req, res) => {
    try {
      let users = await db.User.findAll({
        where: { first_name: { [Op.like]: `%${req.params.name}%` } },
      });
      if (users) {
        res.status(200).json({
          status: 200,
          user: users,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "No se encontro",
        });
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
  createUser: async (req, res) => {
    try {
      let fields = [
        "first_name",
        "last_name",
        "email",
        "password",
        "access",
        "phone",
        "dni",
        "street",
        "street_number",
        "floor",
        "apartment",
        "province",
        "town",
        "CP",
      ];
      let errors = [];
      fields.forEach(field => {
        if (!req.body.hasOwnProperty(field)) {
          errors.push(field);
        }
      });
      if (errors.length > 0) {
        res.status(400).json({
          status: 400,
          message: "Los siguientes campos estan incompletos",
          fields: errors,
        });
      } else {
        await db.User.create(req.body);
        res.status(200).json({
          status: 200,
          message: "Se creo correctamente el Usuario",
        });
      }
    } catch (e) {
      res.status(500).json({
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      console.log(req.body);
      await db.User.update(req.body, { where: { idusers: req.params.id } });
      res.status(200).json({
        status: 200,
        message: "Usuario actualizado correcto",
      });
    } catch (e) {
      res.status(500).json({
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await db.User.destroy({ where: { idusers: req.params.id } });
      res.status(200).json({
        status: 200,
        message: "Usuario elimado correctamente",
      });
    } catch (e) {
      res.status(500).json({
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
};
