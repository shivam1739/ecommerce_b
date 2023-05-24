const ProductController = require("../controller/product.controller");
const AuthenticationMiddelware = require("../middelWare/authenctication.validators");
const imageUpload = require("../utils/imageUpload");
const routes = (app) => {
  app.get("/ecomm/api/v1/products", ProductController.getProducts);
  app.get(
    "/ecomm/api/v1/productsName/:name",
    ProductController.getProductsbyname
  );

  app.get(
    "/ecomm/api/v1/products/:category",
    ProductController.getProductByCategoryId
  );
  app.post(
    "/ecomm/api/v1/products",
    AuthenticationMiddelware.isAuthenticated,
    imageUpload.upload,
    ProductController.addProduct
  );
  app.get("/ecomm/api/v1/products/:id", ProductController.getProductById);
  app.put(
    "/ecomm/api/v1/products/:id",
    AuthenticationMiddelware.isAuthenticated,
    imageUpload.upload,
    ProductController.updateProductById
  );
  app.delete(
    "/ecomm/api/v1/products/:id",
    AuthenticationMiddelware.isAuthenticated,
    ProductController.deleteProducrtById
  );
  app.get(
    "/ecomm/api/v1/productsByCostRange/",
    ProductController.getProductsByCostRange
  );
};

module.exports = routes;
