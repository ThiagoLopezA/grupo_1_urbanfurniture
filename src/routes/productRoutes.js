const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "/img/products"));
    },
    filename: (req, file, cb) => {
        cb(null, "product" + "-" + Date.now() + path.extname(file.originalname));
    },
});
let upload = multer({ storage });

router.get("/", productController.products);

router.get("/create/", productController.create);
router.post("create/", productController.store);

router.get("/edit/:id/", productController.edit);
router.put("/edit/:id", productController.update);
router.delete('/delete/:id', productController.destroy);

router.get("/productCart", productController.productCart);
router.get("/detail/:id/", productController.detail);
router.get("/", productController.list);
router.post('/', upload.single('image'), productController.crear);

module.exports = router;
