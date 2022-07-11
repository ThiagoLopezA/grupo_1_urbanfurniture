const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/:limit?", controller.getProducts);
router.get("/order/:orderBy/:order/:limit?", controller.getProductsOrdered);
router.get("/detail/:id", controller.getProductById);
router.get("/category/:idCategory/:limit?", controller.getProductsByCategory);
router.get("/search/:keywords/:orderBy?/:order?", controller.searchProducts);
router.post("/create", controller.createProduct);
router.put("/update/:id", controller.updateProduct);
router.delete("/delete/:id", controller.deleteProduct);
router.get("/categories/list", controller.getCategories);

module.exports = router;
