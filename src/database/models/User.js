module.exports = (sequelize, DataTypes) => {
  let alias = "User";
  let cols = {
    idusers: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    access: {
      type: DataTypes.INTEGER,
    },
    phone: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.STRING,
    },
  };

  let config = {
    tableName: "users",
    timestamps: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.hasMany(models.Location, {
      as: "locations",
      foreignKey: "users_idusers",
    });
  };

  return User;
};
