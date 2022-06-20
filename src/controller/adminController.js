const db = require("../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

function getOrder(params) {
  if (params.order) {
    return [[params.order, "ASC"]];
  }
}

module.exports = {
  index: (req, res) => {
    db.Product.findAll({ order: [["idproducts", "DESC"]] })
      .then(products => {
        db.User.findAll({
          attributes: [
            [sequelize.fn("count", sequelize.col("idusers")), "count_users"],
          ],
        }).then(users => {
          let url = req.url;
          res.render("adm-dashboard/index", { url, products, users });
        });
      })
      .catch(e => console.log(e));
  },
  products: (req, res) => {
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
      include: [{ association: "categories" }],
    }).then(products => {
      db.Category.findAll().then(cats => {
        res.render("adm-dashboard/products.ejs", {
          url: req.url,
          products: products,
          categories: cats,
        });
      });
    });
  },
  searchProducts: (req, res) => {
    db.Product.findAll({
      attributes: [
        "idproducts",
        "image",
        "discount",
        "price",
        "name",
        "categories_idcategories",
        [sequelize.literal("price-discount*100/price"), "finalPrice"],
      ],
      where: {
        name: {
          [Op.like]: "%" + req.query.keywords + "%",
        },
      },
      order: getOrder(req.query),
      include: [{ association: "categories" }],
    }).then(products => {
      db.Category.findAll().then(cats => {
        res.render("adm-dashboard/products.ejs", {
          url: req.url,
          products: products,
          categories: cats,
        });
      });
    });
  },
  createProduct: (req, res) => {
    if (req.file != undefined) {
      req.body.image = req.file.filename;
    }
    db.Product.create(req.body)
      .then(() => res.redirect("/admin/products"))
      .catch(e => console.log(e));
  },
  editProduct: (req, res) => {
    db.Product.findOne({
      where: { idproducts: req.params.id },
      include: [{ association: "categories" }],
      attributes: [
        "idproducts",
        "image",
        "discount",
        "price",
        "description",
        "name",
        "categories_idcategories",
      ],
    }).then(product => {
      db.Category.findAll().then(cats => {
        res.render("adm-dashboard/editProduct", {
          product,
          url: req.url,
          categories: cats,
        });
      });
    });
  },
  updateProduct: (req, res) => {
    if (req.file != undefined) {
      req.body.image = req.file.filename;
    } else {
      delete req.body.image;
    }
    db.Product.update(req.body, { where: { idproducts: req.params.id } })
      .then(() => res.redirect("/admin/products"))
      .catch(e => console.log(e));
  },
  confirmDeleteProduct: (req, res) => {
    db.Product.findOne({
      where: { idproducts: req.params.id },
      attributes: ["name", "idproducts"],
    }).then(product => {
      res.render("./adm-dashboard/confirmDelete", { url: req.url, product });
    });
  },
  deleteProduct: (req, res) => {
    db.Product.destroy({ where: { idproducts: req.params.id } })
      .then(() => {
        res.redirect("/admin/products");
      })
      .catch(e => console.log(e));
  },
  users: (req, res) => {
    db.User.findAll()
      .then(users => {
        res.render("adm-dashboard/users.ejs", { url: req.url, users });
      })
      .catch(e => console.log(e));
  },
  editUser: (req, res) => {
    db.User.findOne({ where: { idusers: req.params.id } }).then(user => {
      res.render("adm-dashboard/editUser.ejs", { url: req.url, user });
    });
  },
  updateUser: (req, res) => {
    db.User.update(req.body, { where: { idusers: req.params.id } })
      .then(() => res.redirect("/admin/users"))
      .catch(e => console.log(e));
  },
  confirmDeleteUser: (req, res) => {
    db.User.findOne({
      where: { idusers: req.params.id },
      attributes: ["first_name", "idusers"],
    }).then(user => {
      res.render("./adm-dashboard/confirmDeleteUser", { url: req.url, user });
    });
  },
  destroyUser: (req, res) => {
    db.User.destroy({ where: { idusers: req.params.id } })
      .then(() => {
        res.redirect("/admin/users");
      })
      .catch(e => console.log(e));
  },
};
