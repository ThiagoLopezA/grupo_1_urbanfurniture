module.exports = (sequelize, DataTypes) => {
  let alias = "Product";
  let cols = {
    idproducts: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING(45),
    },
    discount: {
      type: DataTypes.FLOAT,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING(100),
    },
    name: {
      type: DataTypes.STRING(100),
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    categories_idcategories: {
      type: DataTypes.INTEGER,
    },
  };

  let config = {
    tableName: "products",
    timestamps: false,
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = models => {
    Product.belongsTo(models.Category, {
      as: "categories",
      foreignKey: "categories_idcategories",
    });
    Product.hasMany(models.Feedback, {
      as: "feedbacks",
      foreignKey: "products_idproducts",
    });
  };

  return Product;
};
