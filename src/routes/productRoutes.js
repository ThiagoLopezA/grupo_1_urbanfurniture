const express = require('express');
const router = express.Router() ;
const productcartController = require('../controller/productController');

router.get('/productCart', productcartController.productCart);
router.get("/product", productcartController.product);

module.exports = router;