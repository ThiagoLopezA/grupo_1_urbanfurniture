const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/productCart", productController.productCart);
router.get("/detail/:id/", productController.detail);
router.get("/", productController.listAll);
router.get("/category/:category", productController.listCategory);
router.get("/inSale", productController.inSale);
router.get("/search", productController.listBySearch);
module.exports = router;
