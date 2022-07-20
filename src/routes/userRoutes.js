const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userMiddleware = require("../middlewares/userMiddleware");

// Middlewares
const validationsRegister = require("../middlewares/validateRegisterMiddleware");
const validationsLogin = require("../middlewares/validateLoginMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");

// Login
router.get("/login", guestMiddleware, userController.login);
router.post("/login", validationsLogin, userController.loginProcess);

// Register
router.get("/register", guestMiddleware, userController.register);
router.post("/register", validationsRegister, userController.registerProcess);

// Logout
router.get("/logout", userController.logout);

// Config
router.post("/config", userController.updateUser);
router.get("/config", userMiddleware, userController.config);

module.exports = router;
