const authController = require("../controller/auth.controller");
const imageUpload = require("../utils/imageUpload");

const routes = (app) => {
  app.post(
    "/ecomm/api/v1/signup/:userType",
    imageUpload.upload,
    authController.signup
  );
  app.post("/ecomm/api/v1/signin", authController.signin);
  app.patch("/ecomm/api/v1/user:userId", authController.addRollToUser);
  app.get("/ecomm/api/v1/user/:userId", authController.getuserbyId);
};

module.exports = routes;
