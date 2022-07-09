const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);
router.post("/create", controller.createProduct);
router.put("/update", controller.updateProduct);
router.delete("/delete/:id", controller.deleteProduct);

module.exports = router;
