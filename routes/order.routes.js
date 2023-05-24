const orderController = require("../controller/order.controller");
const AuthenticationMiddleWare = require("../middelWare/authenctication.validators");
const routes = (app) => {
  app.post(
    "/ecomm/api/v1/addProduct",
    AuthenticationMiddleWare.isAuthenticated,
    orderController.addProduct
  );
  //to remove products from order
  app.patch(
    "/ecomm/api/v1/removeProduct",
    AuthenticationMiddleWare.isAuthenticated,
    orderController.removeProduct
  );
};

module.exports = routes;
