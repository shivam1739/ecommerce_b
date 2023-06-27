const { STATUS } = require("../config/constant");
const { Cart, Product, Cart_Product } = require("../models/index");

const getCartByUser = async (user) => {
  try {
    let cart = await Cart.findOne({
      where: {
        userId: user.id,
      },
      include: Product,
    });
    return cart;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};
const createCart = async (user) => {
  let cart = await Cart.create({
    userId: user.id,
    status: STATUS.CREATION,
  });
  return cart;
};

const addProductToCart = async (cartId, productId) => {
  let cart = await Cart.findByPk(cartId);
  if (cart.status !== STATUS.CREATION) {
    return { error: "order cannot be modified" };
  }
  const product = await Product.findByPk(productId);

  if (!product) {
    return {
      error: "No such product found",
    };
  }
  if (product.status != "published" && product.stock < 1) {
    res.status(400).send({
      message:
        "error while adding product to the cart, either product is out of stock or product status is unPublished please wait for restok",
    });
  }
  let entry = await Cart_Product.findOne({
    where: {
      cartId: cartId,
      productId: productId,
    },
  });
  console.log(entry, "=================");
  // if (!entry) {
  //   return {
  //     error: "No such product found in the order",
  //   };
  // } else {
  if (!entry) {
    entry = await cart.addProduct(productId, {
      through: { quantity: 1 },
    });
  } else {
    await entry.increment("quantity", { by: 1 });
  }
  // }

  return entry;
};
const removedProductToCart = async (cartId, productId) => {
  try {
    const cart = await Cart.findByPk(cartId);
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
    const entry = await Cart_Product.findOne({
      where: {
        cartId: cartId,
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
