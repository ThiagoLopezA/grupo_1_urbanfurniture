const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/img/products"));
  },
  filename: (req, file, cb) => {
    const newfilename =
      "product" + "-" + Date.now() + path.extname(file.originalname);
    cb(null, newfilename);
  },
});
let upload = multer({ storage });

/*
router.get("/edit/:id/", productController.edit);
router.put("/edit/:id", productController.update);
router.delete('/delete/:id', productsController.destroy);
*/
router.get("/productCart", productController.productCart);
router.get("/detail/:id/", productController.detail);
router.get("/", productController.list);
router.post("/", upload.single("image"), productController.crear);
router.get("/edit/:id", productController.edit);
router.put("/update/:id", upload.single("image"), productController.update);
router.delete("/delete/:id", productController.delete);

module.exports = router;
