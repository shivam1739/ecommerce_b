const authController = require("../controller/auth.controller");
const uploadImageMiddleware = require("../utils/imageUploadMiddleware");
const formdata = require("../utils/imageUploadMiddleware");

const routes = (app) => {
  app.post(
    "/ecomm/api/v1/signup/:userType",
    formdata,
    uploadImageMiddleware,
    authController.signup
  );
  app.post("/ecomm/api/v1/signin", authController.signin);
  app.patch("/ecomm/api/v1/user:userId", authController.addRollToUser);
  app.get("/ecomm/api/v1/user/:userId", authController.getuserbyId);
};

module.exports = routes;
