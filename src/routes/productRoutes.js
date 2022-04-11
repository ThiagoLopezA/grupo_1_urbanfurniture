const express = require('express');
const router = express.Router() ;
const productcartController = require('../controller/productcartController');

router.get('/productCart', productcartController.productCart);

module.exports = router;