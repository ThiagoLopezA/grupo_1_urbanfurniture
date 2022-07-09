const db = require("../database/models");
const sequelize = require("sequelize");
module.exports = {
  getProducts: async (req, res) => {
    try {
      let products = await db.Product.findAll({
        include: [{ association: "categories" }],
        attributes: [
          "idproducts",
          "image",
          "discount",
          "price",
          "description",
          "name",
          "rating",
          "categories_idcategories",
          [sequelize.literal("price-discount*100/price"), "finalPrice"],
        ],
      });
      let categories = await db.Product.findAll({
        include: [{ association: "categories" }],
        group: ["categories_idcategories"],
        attributes: [
          "categories_idcategories",
          [
            sequelize.fn("count", sequelize.col("categories_idcategories")),
            "count_cats",
          ],
        ],
      });

      res.status(200).json({
        status: 200,
        countProducts: products.length,
        countCategories: categories.length,
        products,
        categories,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
  getProductById: (req, res) => {},
  createProduct: async (req, res) => {
    try {
      let fields = [
        "name",
        "price",
        "discount",
        "description",
        "image",
        "categories_idcategories",
      ];
      let errors = [];
      fields.forEach(field => {
        if (!req.body.hasOwnProperty(field)) {
          errors.push(field);
        }
      });
      if (errors.length > 0) {
        res.status(400).json({
          status: 400,
          message: "Los siguientes campos estan incompletos",
          fields: errors,
        });
      } else {
        await db.Product.create(req.body);
        res.status(200).json({
          status: 200,
          message: "Se creo exitosamente!",
        });
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
  updateProduct: (req, res) => {},
  deleteProduct: async (req, res) => {
    try {
      await db.Product.destroy({ where: { idproducts: req.params.id } });
      res.status(200).json({
        status: 200,
        message: "El producto se elimino correctamente",
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
};
