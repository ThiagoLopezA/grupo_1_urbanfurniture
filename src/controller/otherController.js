const db = require("../database/models");
const sequelize = db.sequelize;

const otherController = {
  main: (req, res) => {
    db.Product.findAll({
      limit: 4,
      include: [{ association: "categories" }],
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
    })
      .then(data => {
        res.render("others/main", { data });
      })
      .catch(e => res.send(e));
  },
  contact: (req, res) => {
    res.render("others/contact");
  },
};

module.exports = otherController;
