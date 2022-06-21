const fs = require("fs");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models");
const sequelize = require("sequelize");
//const sequelize = db.sequelize;
const Op = sequelize.Op;

const productController = {
  productCart: (req, res) => {
    let productData = [
      {
        src: "../img/products/product-3.png",
        precioAnt: 30785,
        precio: 27690,
        nombre: "Silla Bulgaria",
      },
      {
        src: "../img/products/product-2.png",
        precioAnt: 30785,
        precio: 27690,
        nombre: "Silla Ferragamo",
      },
    ];
    res.render("product/productCart", { data: productData });
  },
  detail: (req, res) => {
    db.Product.findOne({
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
      where: { idproducts: req.params.id },
      include: [{ association: "categories" }],
    }).then(product => {
      db.Product.findAll({
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
        where: { categories_idcategories: product.categories_idcategories },
        limit: 4,
      }).then(sameCategory => {
        res.render("product/detail", {
          product: product,
          suggestions: sameCategory,
        });
      });
    });
  },
  listAll: (req, res) => {
    db.Product.findAll({
      include: [{ association: "categories" }],
      group: ["categories_idcategories"],
      attributes: [
        "categories_idcategories",
        [
          sequelize.fn("count", sequelize.col("categories_idcategories")),
          "count_cats",
        ],
      ],
    }).then(cats => {
      db.Product.findAll({
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
      }).then(data => {
        res.render("product/products", {
          data: data,
          filtro: "Todos los productos",
          categories: cats,
        });
      });
    });
  },
  listCategory: (req, res) => {
    db.Product.findAll({
      include: [{ association: "categories" }],
      group: ["categories_idcategories"],
      attributes: [
        "categories_idcategories",
        [
          sequelize.fn("count", sequelize.col("categories_idcategories")),
          "count_cats",
        ],
      ],
    }).then(cats => {
      db.Product.findAll({
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
        where: { categories_idcategories: req.params.category },
      }).then(products => {
        res.render("product/products", {
          data: products,
          filtro: products[0].categories.dataValues.nombre,
          categories: cats,
        });
      });
    });
  },

  listBySearch: (req, res) => {
    db.Product.findAll({
      include: [{ association: "categories" }],
      group: ["categories_idcategories"],
      attributes: [
        "categories_idcategories",
        [
          sequelize.fn("count", sequelize.col("categories_idcategories")),
          "count_cats",
        ],
      ],
    }).then(cats => {
      db.Product.findAll({
        where: {
          name: {
            [Op.like]: "%" + req.query.keywords + "%",
          },
        },
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
      }).then(products => {
        res.render("product/products", {
          data: products,
          filtro: req.query.keywords,
          categories: cats,
        });
      });
    });
  },
  // create: (req, res) => {
  //   if (req.file != undefined) {
  //     req.body.image = req.file.filename;
  //   }
  //   db.Product.create(req.body)
  //     .then(() => res.redirect("/admin/products"))
  //     .catch(e => console.log(e));
  // },
  // edit: (req, res) => {
  //   db.Product.findOne({
  //     where: { idproducts: req.params.id },
  //     include: [{ association: "categories" }],
  //     attributes: [
  //       "idproducts",
  //       "image",
  //       "discount",
  //       "price",
  //       "description",
  //       "name",
  //       "categories_idcategories",
  //     ],
  //   }).then(product => {
  //     db.Category.findAll().then(cats => {
  //       res.render("adm-dashboard/editProduct", {
  //         product,
  //         url: req.url,
  //         categories: cats,
  //       });
  //     });
  //   });
  // },
  // update: (req, res) => {
  //   if (req.file != undefined) {
  //     req.body.image = req.file.filename;
  //   } else {
  //     delete req.body.image;
  //   }
  //   db.Product.update(req.body, { where: { idproducts: req.params.id } })
  //     .then(() => res.redirect("/admin/products"))
  //     .catch(e => console.log(e));
  // },
  // confirmDelete: (req, res) => {
  //   db.Product.findOne({
  //     where: { idproducts: req.params.id },
  //     attributes: ["name", "idproducts"],
  //   }).then(product => {
  //     res.render("./adm-dashboard/confirmDelete", { url: req.url, product });
  //   });
  // },
  // delete: (req, res) => {
  //   db.Product.destroy({ where: { idproducts: req.params.id } })
  //     .then(() => {
  //       res.redirect("/admin/products");
  //     })
  //     .catch(e => console.log(e));
  // },
};

module.exports = productController;
