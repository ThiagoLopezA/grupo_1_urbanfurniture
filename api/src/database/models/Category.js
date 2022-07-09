module.exports = (sequelize, DataTypes) => {
  let alias = "Category";
  let cols = {
    idcategories: {
      type: DataTypes.INTEGER,
      autoincrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
  };
  let config = {
    tableName: "categories",
    timestamps: false,
  };
  const Category = sequelize.define(alias, cols, config);

  Category.associate = models => {
    Category.hasMany(models.Product, {
      as: "products",
      foreignKey: "categories_idcategories",
    });
  };

  return Category;
};
