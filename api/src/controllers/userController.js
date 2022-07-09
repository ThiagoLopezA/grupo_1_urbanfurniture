const db = require("../database/models");
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
  createUser: async (req, res) => {
    try {
    } catch (e) {
      res.status(500).json({
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
    } catch (e) {
      res.status(500).json({
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
    } catch (e) {
      res.status(500).json({
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
};
