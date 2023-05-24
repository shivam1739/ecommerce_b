const e = require("express");
const { STATUS } = require("../config/constant");
const { Order, Product, Order_Product } = require("../models/index");

const getCartByUser = async (user, STATUS) => {
  try {
    let cart = await Order.findOne({
      where: {
        userId: user.id,
        status: STATUS,
      },
    });
    return cart;
  } catch (err) {
    console.error(err);
  }
};
const createCart = async (user) => {
  let cart = await Order.create({
    userId: user.id,
    status: STATUS.CREATION,
  });
  return cart;
};

const addProductToCart = async (orderId, productId) => {
  let cart = await Order.findByPk(orderId);
  if (cart.status !== STATUS.CREATION) {
    return { error: "order cannot be modified" };
  }
  const product = await Product.findByPk(productId);

  if (!product) {
    return {
      error: "No such product found",
    };
  }
  const entry = await Order_Product.findOne({
    where: {
      orderId: orderId,
      productId: productId,
    },
  });
  if (!entry) {
    return {
      error: "No such product found in the order",
    };
  } else {
    if (entry.quantity <= 0) {
      const entry = await cart.addProduct(productId, {
        through: { quantity: 1 },
      });
    } else {
      await entry.increment("quantity", { by: 1 });
    }
  }

  return entry;
};
const removedProductToCart = async (orderId, productId) => {
  try {
    const cart = await Order.findByPk(orderId);
    if (cart.status !== STATUS.CREATION) {
      return {
        error: "Order cannot be modified",
      };
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return {
        error: "No such product found",
      };
    }
    const entry = await Order_Product.findOne({
      where: {
        orderId: orderId,
        productId: product.id,
      },
    });
    if (!entry) {
      return {
        error: "No such product found in the order",
      };
    } else {
      if (entry.quantity <= 1) {
        cart.removeProduct(product);
      } else {
        await entry.decrement("quantity", { by: 1 });
      }
    }

    return entry;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCartByUser,
  addProductToCart,
  createCart,
  removedProductToCart,
};
