const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.get("/", adminController.index);
router.get('/agregarProducto', adminController.agregarProducto);

module.exports = router;
