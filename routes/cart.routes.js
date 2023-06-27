const cartController = require("../controller/cart.controller");
const AuthenticationMiddleWare = require("../middelWare/authenctication.validators");
const routes = (app) => {
  app.post(
    "/ecomm/api/v1/addProduct",
    AuthenticationMiddleWare.isAuthenticated,
    cartController.addProduct
  );
  //to remove products from order
  app.patch(
    "/ecomm/api/v1/removeProduct",
    AuthenticationMiddleWare.isAuthenticated,
    cartController.removeProduct
  );
  app.get(
    "/ecomm/api/v1/cart",
    AuthenticationMiddleWare.isAuthenticated,
    cartController.getCartByUserId
  );
};

module.exports = routes;
