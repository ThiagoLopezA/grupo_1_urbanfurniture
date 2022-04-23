const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/", productController.products);

router.get("/create/", productController.create);
router.post("create/", productController.store);

router.get("/edit/:id/", productController.edit);
router.put("/edit/:id", productController.update);
router.delete('/delete/:id', productsController.destroy);

router.get("/productCart", productController.productCart);
router.get("/detail/:id/", productController.product);

module.exports = router;
