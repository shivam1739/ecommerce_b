const categoryController = require("../controller/category.controller");
const categoryMiddelware = require("../middelWare/category.validators");
const authenticationMiddelware = require("../middelWare/authenctication.validators");
const imageUploadMiddleware = require("../utils/imageUploadMiddleware");
const authorizationMiddleware = require("../middelWare/authorization.middleware");
const routes = (app) => {
  app.get("/ecomm/api/v1/categories", categoryController.getCategories);

  app.post(
    "/ecomm/api/v1/categories",
    authenticationMiddelware.isAuthenticated,
    authorizationMiddleware.isAdmin,
    imageUploadMiddleware,
    categoryMiddelware.validateCreate,
    categoryController.createCategory
  );
  app.get("/ecomm/api/v1/categories/:id", categoryController.getCategoriesById);
  /* to get all categories by name */

  app.get(
    "/ecomm/api/v1/categoriesByName/",
    categoryController.getCategoriesByName
  );

  /* to update the category by given id */
  app.put(
    "/ecomm/api/v1/categories/:id",
    categoryMiddelware.validateCreate,
    authenticationMiddelware.isAuthenticated,
    imageUploadMiddleware,
    categoryController.updateCategory
  );

  /* to delete a category by id*/
  app.delete(
    "/ecomm/api/v1/categories/:id",
    categoryMiddelware.validateCreate,
    authenticationMiddelware.isAuthenticated,
    authorizationMiddleware.isAdmin,
    categoryController.deleteCategory
  );
};

module.exports = routes;
