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

router.get("/productCart", productController.productCart);
router.get("/detail/:id/", productController.detail);
router.get("/", productController.listAll);
router.post("/", upload.single("image"), productController.crear);
router.get("/edit/:id", productController.edit);
router.put("/update/:id", upload.single("image"), productController.update);
router.delete("/delete/:id", productController.delete);
router.get("/category/:category", productController.listCategory);
router.get("/search", productController.listBySearch);
module.exports = router;
