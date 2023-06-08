"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {
        foreignKey: {
          name: "category_id",
        },
      });
      this.belongsTo(models.User, {
        foreignKey: {
          name: "sellerId",
        },
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      describtion: DataTypes.STRING,
      image: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      status: DataTypes.ENUM("published", "unPublished", "otuOfStock"),
      cost: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
