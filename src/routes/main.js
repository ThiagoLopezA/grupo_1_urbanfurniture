const express = require("express");
const router = express.Router();
const otherController = require("../controller/otherController");

router.get("/", otherController.main);
router.get("/contact", otherController.contact);

module.exports = router;
