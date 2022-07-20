const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/inSale/:limit?", controller.getProductsInSale);
router.get("/detail/:id", controller.getProductById);
router.get("/category/:idCategory/:limit?", controller.getProductsByCategory);
router.get("/order/:orderBy/:order/:limit?", controller.getProductsOrdered);
router.get("/search/:keywords/:orderBy?/:order?", controller.searchProducts);
router.post("/create", controller.createProduct);
router.put("/update/:id", controller.updateProduct);
router.delete("/delete/:id", controller.deleteProduct);
router.get("/categories/list", controller.getCategories);
router.get("/:limit?/:inSale?", controller.getProducts);

module.exports = router;
