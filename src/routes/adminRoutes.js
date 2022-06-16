const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.get("/", adminController.index);
router.get("/products", adminController.products);
router.get("/products/search", adminController.searchProducts);
router.get("/users", adminController.users);
router.get("/users/edit/:id", adminController.editUser);
router.put("/users/edit/:id", adminController.updateUser);
router.get("/users/delete/:id", adminController.confirmDeleteUser);
router.delete("/users/delete/:id", adminController.destroyUser);
module.exports = router;
