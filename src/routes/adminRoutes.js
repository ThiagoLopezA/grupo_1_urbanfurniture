const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const multer = require("multer");
const path = require("path");
const productMiddleware = require("../middlewares/validateProduct");

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

router.get("/", adminController.index);
router.get("/products", adminController.products);
router.get("/products/search", adminController.searchProducts);
router.post(
  "/products/",
  upload.single("image"),
  productMiddleware,
  adminController.createProduct
);
router.get("/products/edit/:id", adminController.editProduct);
router.put(
  "/products/update/:id",
  upload.single("image"),
  productMiddleware,
  adminController.updateProduct
);
router.get("/products/delete/:id", adminController.confirmDeleteProduct);
router.delete("/products/delete/:id", adminController.deleteProduct);
router.get("/users", adminController.users);
router.get("/users/edit/:id", adminController.editUser);
router.put("/users/edit/:id", adminController.updateUser);
router.get("/users/delete/:id", adminController.confirmDeleteUser);
router.delete("/users/delete/:id", adminController.destroyUser);
module.exports = router;
