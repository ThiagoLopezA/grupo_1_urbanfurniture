const { body } = require("express-validator");

module.exports = [
  body("name").notEmpty().bail(),
  body("price").notEmpty().bail(),
  body("discount").notEmpty().bail(),
  body("description").notEmpty().bail(),
  body("categories").notEmpty().bail(),
];
