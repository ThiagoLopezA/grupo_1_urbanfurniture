const { body } = require("express-validator");

module.exports = [
  body("name").notEmpty().withMessage("name").bail(),
  body("price").notEmpty().withMessage("price").bail(),
  body("discount").notEmpty().withMessage("discount").bail(),
  body("description").notEmpty().withMessage("description").bail(),
  body("categories_idcategories").notEmpty().withMessage("categories").bail(),
];
