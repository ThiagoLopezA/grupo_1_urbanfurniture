const db = require("../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

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
        limit: req.params.limit ? parseInt(req.params.limit) : null,
      });
      let categories = await db.Category.findAll({
        include: [{ association: "products", as: "p" }],
        attributes: ["idcategories", "nombre"],
      });
      categories.forEach(category => {
        category.dataValues.products = category.dataValues.products.length;
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
  getProductsInSale: async (req, res) => {
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
        limit: req.params.limit ? parseInt(req.params.limit) : null,
        where: { discount: { [Op.gt]: 0 } },
      });
      let categories = await db.Category.findAll({
        include: [{ association: "products", as: "p" }],
        attributes: ["idcategories", "nombre"],
      });
      categories.forEach(category => {
        category.dataValues.products = category.dataValues.products.length;
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
  getProductsOrdered: async (req, res) => {
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
        limit: req.params.limit ? parseInt(req.params.limit) : null,
        order: [[req.params.orderBy, req.params.order]],
      });
      let categories = await db.Category.findAll({
        include: [{ association: "products", as: "p" }],
        attributes: ["idcategories", "nombre"],
      });
      categories.forEach(category => {
        category.dataValues.products = category.dataValues.products.length;
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
  getProductById: async (req, res) => {
    try {
      let product = await db.Product.findOne({
        attributes: [
          "idproducts",
          "image",
          "discount",
          "price",
          "description",
          "name",
          "rating",
          "categories_idcategories",
          [sequelize.literal("price - (discount*price) / 100"), "finalPrice"],
        ],
        where: { idproducts: req.params.id },
        include: [{ association: "categories" }],
      });
      let finalPrice = product.dataValues.finalPrice;
      res.status(200).json({
        status: 200,
        id: product.idproducts,
        name: product.name,
        price: product.price,
        finalPrice: finalPrice,
        discount: product.discount,
        rating: product.rating ? product.rating : 0,
        description: product.description,
        image: product.image,
        category: product.categories.nombre,
        idcategory: product.categories.idcategories,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
  getProductsByCategory: async (req, res) => {
    try {
      let products = await db.Product.findAll({
        attributes: [
          "idproducts",
          "image",
          "discount",
          "price",
          "description",
          "name",
          "rating",
          [sequelize.literal("price-discount*100/price"), "finalPrice"],
        ],
        include: [{ association: "categories" }],
        where: { categories_idcategories: req.params.idCategory },
        limit: req.params.limit ? parseInt(req.params.limit) : null,
      });
      let categories = await db.Category.findAll({
        include: [{ association: "products" }],
        attributes: ["idcategories", "nombre"],
      });
      categories.forEach(category => {
        category.dataValues.products = category.dataValues.products.length;
      });
      res.status(200).json({
        status: 200,
        category: products[0].categories.nombre,
        countProducts: products.length,
        products: products,
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
  searchProducts: async (req, res) => {
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
        limit: req.params.limit ? parseInt(req.params.limit) : null,
        where: {
          name: {
            [Op.like]: "%" + req.params.keywords + "%",
          },
        },
        order:
          req.params.order && req.params.orderBy
            ? [[req.params.orderBy, req.params.order]]
            : null,
      });
      let categories = await db.Category.findAll({
        include: [{ association: "products", as: "p" }],
        attributes: ["idcategories", "nombre"],
      });
      categories.forEach(category => {
        category.dataValues.products = category.dataValues.products.length;
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
  updateProduct: async (req, res) => {
    try {
      await db.Product.update(req.body, {
        where: { idproducts: req.params.id },
      });
      res.status(200).json({
        status: 200,
        message: "Se actualizo exitosamente!",
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Ocurrio un error:",
        error: e,
      });
    }
  },
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
  getCategories: async (req, res) => {
    try {
      let categories = await db.Category.findAll({
        attributes: ["idcategories", "nombre"],
      });
      res.status(200).json({
        categories,
        status: 200,
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
