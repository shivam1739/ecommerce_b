const roleController = require("../controller/role.controller");
const AuthenticationMiddleWare = require("../middelWare/authenctication.validators");

const routes = (app) => {
  app.post(
    "/ecomm/api/v1/role",
    AuthenticationMiddleWare.isAuthenticated,
    roleController.addRoleToUser
  );
  app.delete(
    "/ecomm/api/v1/role",
    AuthenticationMiddleWare.isAuthenticated,
    AuthenticationMiddleWare.isAdmin,
    roleController.removeRoleFromUser
  );
};

module.exports = routes;
