const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.get("/", adminController.index);
router.get("/products", adminController.products);
router.get("/products/search", adminController.searchProducts);
router.get("/users", adminController.users);

router.get("/agregarProducto", adminController.agregarProducto);
router.get("/modificar", adminController.modificarProducto);
router.get("/modificar/search", adminController.search);

module.exports = router;
