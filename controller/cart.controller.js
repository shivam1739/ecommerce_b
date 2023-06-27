const { STATUS } = require("../config/constant");
const cartService = require("../services/cart.service");
const addProduct = async (req, res) => {
  let cart = await cartService.getCartByUser(req.user, STATUS.CREATION);
  if (!cart) {
    cart = await cartService.createCart(req.user);
  }
  let responce = await cartService.addProductToCart(
    cart.id,
    req.body.productId
  );
  if (responce.error) {
    return res.json({
      status: 400,
      success: false,
      message: responce.error,
    });
  }
  if (responce) {
    return res.json({
      status: 200,
      success: true,
      message: "successfully add product to the cart",
    });
  }
};

const removeProduct = async (req, res) => {
  let cart = await cartService.getCartByUser(req.user, STATUS.CREATION);
  if (!cart) {
    return res.json({
      status: 400,
      success: true,
      message: "No order for current user",
    });
  }
  const response = await cartService.removedProductToCart(
    req.body.productId,
    cart.id
  );
  if (!response) {
    return res.json({
      status: 500,
      success: true,
      message: "internal server error",
    });
  }
  if (response.error) {
    return res.json({
      status: 400,
      success: true,
      message: response.error,
    });
  }
  return res.json({
    status: 200,
    success: true,
    message: "Product removed from order successfully",
  });
};

const getCartByUserId = async (req, res) => {
  const response = {};
  let statusCode;

  const result = await cartService.getCartByUser(req.user);

  if (!result) {
    response.message = "cart not found";
    statusCode = 404;
  } else {
    response.message = "successfull fetched cart";
    response.data = result;
    statusCode = 200;
  }
  res.status(statusCode).send(response);
};

module.exports = {
  addProduct,
  removeProduct,
  getCartByUserId,
};
