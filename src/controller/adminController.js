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
  editProducts: (req, res) => {
    let database = products.getProducts();
    let product = database.find(p => (p.id = req.params.id));
    res.render("adm-dashboard/editProduct.ejs", { product, url: req.url });
  },
  users: (req, res) => {
    res.render("adm-dashboard/users.ejs", { url: req.url });
  },

  modificarProducto: (req, res) => {
    let database = products.getProducts();
    res.render("adm-dashboard/modificarProducto.ejs", { data: database });
  },
};
