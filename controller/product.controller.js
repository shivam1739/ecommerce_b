const ProductsServices = require("../services/product.service");
const { PRODUCT_STATUS } = require("../constants/product.constants");
const imageDelete = require("../utils/imageDelete");
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
  const validStatus = PRODUCT_STATUS.includes(req.body.status);
  if (!validStatus) {
    await imageDelete(req, res);
    return res
      .status(400)
      .send({ message: "please provide valid status ex: " + PRODUCT_STATUS });
  }
  const response = await ProductsServices.addProduct(req.body, req.user);
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

const getProductBySellerId = async (req, res) => {
  const response = await ProductsServices.getProductBySellerId(
    req.params.sellerId
  );
  return res.status(200).send({
    message: "successfully fetch product",
    response: response,
    success: true,
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
  getProductBySellerId,
};
