"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
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
        through: models.Order_Product,
        foreignKey: "orderId",
        otherkey: "productId",
      });
    }
  }
  Order.init(
    {
      paymentId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      deliveryStatus: {
        type: DataTypes.ENUM(
          "pending",
          "in Progress",
          "out for delivery",
          "delivered",
          "cancelled"
        ),
        defaultValue: "in Progress",
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
