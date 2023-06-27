const {
  Order,
  Order_Product,
  Cart,
  Cart_Product,
  Product,
} = require("../models/index");

const orderCreate = async (cart, paymentId) => {
  try {
    const order = await Order.create({
      userId: cart.userId,
      paymentId: paymentId,
    });
    for (const buyProduct of cart.Products) {
      await order.addProduct(buyProduct, {
        through: {
          quantity: buyProduct.Cart_Product.quantity,
        },
      });

      const product = await Product.findOne({
        where: {
          id: buyProduct.id,
        },
      });
      if (product) {
        await product.decrement("stock", {
          by: buyProduct.Cart_Product.quantity,
        });
      }
    }

    return order;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

module.exports = { orderCreate };
