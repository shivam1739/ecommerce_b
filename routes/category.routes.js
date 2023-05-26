const CategoryController = require("../controller/category.controller");
const CategoryMiddelware = require("../middelWare/category.validators");
const AuthenticationMiddelware = require("../middelWare/authenctication.validators");
const uploadImageMiddleware = require("../utils/imageUploadMiddleware");
const imageUploadMiddleware = require("../utils/imageUploadMiddleware");

const routes = (app) => {
  app.get("/ecomm/api/v1/categories", CategoryController.getCategories);

  app.post(
    "/ecomm/api/v1/categories",
    CategoryMiddelware.validateCreate,
    AuthenticationMiddelware.isAuthenticated,
    imageUploadMiddleware,
    CategoryController.createCategory
  );
  app.get("/ecomm/api/v1/categories/:id", CategoryController.getCategoriesById);
  /* to get all categories by name */

  app.get(
    "/ecomm/api/v1/categoriesByName/",
    CategoryController.getCategoriesByName
  );

  /* to update the category by given id */
  app.put(
    "/ecomm/api/v1/categories/:id",
    CategoryMiddelware.validateCreate,
    AuthenticationMiddelware.isAuthenticated,
    imageUploadMiddleware,
    CategoryController.updateCategory
  );

  /* to delete a category by id*/
  app.delete(
    "/ecomm/api/v1/categories/:id",
    CategoryMiddelware.validateCreate,
    AuthenticationMiddelware.isAuthenticated,
    CategoryController.deleteCategory
  );
};

module.exports = routes;
