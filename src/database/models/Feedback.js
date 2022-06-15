module.exports = (sequelize, DataTypes) => {
  let alias = "Feedback";
  let cols = {
    idfeedbacks: {
      type: DataTypes.INTEGER,
      autoincrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    commentary: {
      type: DataTypes.STRING(250),
    },
    users_idusers: {
      type: DataTypes.INTEGER,
    },
    products_idproducts: {
      type: DataTypes.INTEGER,
    },
  };
  let config = {
    tableName: "feedbacks",
    timestamps: false,
  };
  const Feedback = sequelize.define(alias, cols, config);

  Feedback.associate = models => {
    Feedback.belongsTo(models.Product, {
      as: "products",
      foreignKey: "products_idproducts",
    });
  };

  return Feedback;
};
