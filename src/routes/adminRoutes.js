const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.get("/", adminController.index);
router.get("/products", adminController.products);
router.get("/products/search", adminController.searchProducts);
router.get("/products/edit/:id", adminController.editProducts);
router.get("/users", adminController.users);

router.get("/modificar", adminController.modificarProducto);

module.exports = router;
