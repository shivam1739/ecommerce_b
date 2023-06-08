"use strict";
const { Model } = require("sequelize");
const product = require("./product");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsToMany(models.Product, {
        through: models.Cart_Product,
        foreignKey: "cartId",
        otherkey: "productId",
      });
    }
  }
  Cart.init(
    {
      status: DataTypes.STRING,
      delivery: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
