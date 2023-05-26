const ProductsServices = require("../services/product.service");

const getProducts = async (req, res) => {
  const response = await ProductsServices.getAllProducts();
  return res.json({
    message: "successfully fatched all product",
    sucess: true,
    code: 200,
    data: response,
  });
};

const addProduct = async (req, res) => {
  const response = await ProductsServices.addProduct(req.body);
  return res.json({
    message: "successfully add product",
    sucess: true,
    code: 201,
    data: response,
  });
};
const getProductById = async (req, res) => {
  const response = await ProductsServices.getProductById(req.params.id);
  return res.json({
    message: "successfully fetch product",
    sucess: true,
    code: 200,
    data: response,
  });
};

const deleteProducrtById = async (req, res) => {
  const response = await ProductsServices.deleteProducrtById(req.params.id);
  return res.json({
    message: "successfully delete product",
    sucess: true,
    code: 200,
    data: response,
  });
};
const updateProductById = async (req, res) => {
  const response = await ProductsServices.updateProductById(
    req.params.id,
    req.body
  );
  return res.json({
    message: "successfully update product",
    sucess: true,
    code: 200,
    data: response,
  });
};
const getProductByCategoryId = async (req, res) => {
  const response = await ProductsServices.getProductByCategoryId(
    req.params.category
  );
  return res.json({
    message: "successfully fatched products",
    success: true,
    code: 200,
    data: response,
  });
};

const getProductsbyname = async (req, res) => {
  const response = await ProductsServices.getProductsbyname(req.params.name);
  return res.json({
    message: "successfully fetch product",
    sucess: true,
    code: 200,
    data: response,
  });
};
const getProductsByCostRange = async (req, res) => {
  const response = await ProductsServices.getProductsByCostRange(req.query);
  return res.json({
    message: "successfully fetch product",
    sucess: true,
    code: 200,
    data: response,
  });
};

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  deleteProducrtById,
  updateProductById,
  getProductsbyname,
  getProductsByCostRange,
  getProductByCategoryId,
};
