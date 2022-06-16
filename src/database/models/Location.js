module.exports = (sequelize, DataTypes) => {
  let alias = "Location";
  let cols = {
    idlocations: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    street: {
      type: DataTypes.STRING,
    },
    street_number: {
      type: DataTypes.INTEGER,
    },
    floor: {
      type: DataTypes.INTEGER,
    },
    apartment: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    town: {
      type: DataTypes.STRING,
    },
    codigo_postal: {
      type: DataTypes.STRING,
    },
    users_idusers: {
      type: DataTypes.INTEGER,
    },
  };
  let config = {
    tableName: "locations",
    timestamps: false,
  };
  const Location = sequelize.define(alias, cols, config);

  Location.associate = models => {
    Location.belongsTo(models.User, {
      as: "locations",
      foreignKey: "users_idusers",
    });
  };
  return Location;
};
