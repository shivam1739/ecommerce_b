const CategoryService = require("../services/category.service");
const imageDelete = require("../utils/imageDelete");

const getCategories = async (req, res) => {
  const allCategoriesData = await CategoryService.getAllCategories();
  return res.json({
    message: "successfull fetched data",
    success: true,
    code: 200,

    data: allCategoriesData,
  });
};

const createCategory = async (req, res) => {
  console.log(req.body, "========================", req.file);
  const response = await CategoryService.createNewCategory(req.body);

  return res.json({
    message: "successfully create the category",
    success: true,
    code: 201,
    data: response,
  });
};

const getCategoriesById = async (req, res) => {
  const response = await CategoryService.getCategoriesById(req.params.id);

  return res.json({
    message: "successfull fetched data",
    success: true,
    code: 200,
    data: response,
  });
};
const getCategoriesByName = async (req, res) => {
  const response = await CategoryService.getCategoriesByName(req.query.name);
  return res.json({
    message: "successfull fetched data by name",
    success: true,
    code: 200,
    data: response,
  });
};
const updateCategory = async (req, res) => {
  const response = await CategoryService.updateCategory(
    req.params.id,
    req.body
  );
  return res.json({
    message: "successfull update category ",
    success: true,
    code: 201,
    data: response,
  });
};

const deleteCategory = async (req, res) => {
  try {
    const response = {};
    var statusCode;
    const category = await CategoryService.getCategoriesById(req.params.id);
    if (!category) {
      response.message = "category not found";
      statusCode = 404;
    } else {
      const result = await CategoryService.deleteCategory(req.params.id);
      await imageDelete(category.image);
      response.message = "successfully deleted";
      statusCode = 200;
    }
    res.status(statusCode).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoriesById,
  updateCategory,
  getCategoriesByName,
  deleteCategory,
};
