const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/productCart", productController.productCart);
router.get("/detail/:id/", productController.product);

module.exports = router;
