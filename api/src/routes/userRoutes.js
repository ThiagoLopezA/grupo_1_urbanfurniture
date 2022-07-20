const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.get("/email/:email", controller.getUserByEmail);
router.get("/name/:name", controller.getUsersByName);
router.post("/create", controller.createUser);
router.put("/update/:id", controller.updateUser);
router.delete("/delete/:id", controller.deleteUser);

module.exports = router;
