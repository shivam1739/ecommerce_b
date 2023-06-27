const orderController = require("../controller/order.controller");
const AuthenticationMiddleWare = require("../middelWare/authenctication.validators");

const routes = (app) => {
  app.post(
    "/ecomm/api/v1/order/checkout",
    AuthenticationMiddleWare.isAuthenticated,
    orderController.checkout
  );
  app.post(
    "/ecomm/api/v1/order/payment/confirmed",
    orderController.createOrder
  );
};

module.exports = routes;
