const { Category } = require("../models/index");

const getAllCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

const createNewCategory = async (data, img) => {
  console.log("=========================================");
  const newCategory = await Category.create({
    name: data.name,
    image: data.image,
    description: data.description,
  });
  return newCategory;
};

const getCategoriesById = async (Id_data) => {
  const categoriesById = Category.findOne({
    where: {
      id: Id_data,
    },
  });
  return categoriesById;
};

const getCategoriesByName = async (name_data) => {
  const getResponse = await Category.findAll({
    where: {
      name: name_data,
    },
  });

  return getResponse;
};

const updateCategory = async (idData, body, img) => {
  const updateResponse = await Category.update(
    {
      name: body.name,
      describtion: body.describtion,
      image: body.image,
    },
    {
      where: {
        id: idData,
      },
    }
  );
  return updateResponse;
};

const deleteCategory = async (data) => {
  const deleteResponse = await Category.destroy({
    where: {
      id: data,
    },
  });
  return deleteResponse;
};

module.exports = {
  getAllCategories,
  createNewCategory,
  getCategoriesById,
  getCategoriesByName,
  updateCategory,
  deleteCategory,
};
