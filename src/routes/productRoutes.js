const express = require('express');
const router = express.Router() ;
const productcartController = require('../controller/productController');

router.get('/productCart', productcartController.productCart);

module.exports = router;