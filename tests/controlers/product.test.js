const ProductController = require('../../controller/product.controller')
const ProductServices = require('../../services/product.service')
const {mockRequest,mockResponse} = require('./mocker')

const  getProductByCategoryIdResponse =  [
    {
        "id": 1,
        "name": "mobile",
        "describtion": "i phone",
        "cost": 166654,
        "category_id": 1,
        "createdAt": "2022-09-23T11:15:18.000Z",
        "updatedAt": "2022-09-23T11:15:18.000Z"
    },
    {
        "id": 2,
        "name": "mobile",
        "describtion": "i phone",
        "cost": 166654,
        "category_id": 1,
        "createdAt": "2022-09-23T11:17:33.000Z",
        "updatedAt": "2022-09-23T11:17:33.000Z"
    },
    {
        "id": 3,
        "name": "mobile",
        "describtion": "i phone",
        "cost": 166654,
        "category_id": 1,
        "createdAt": "2022-09-23T11:46:35.000Z",
        "updatedAt": "2022-09-23T11:46:35.000Z"
    },
    {
        "id": 4,
        "name": "tablet",
        "describtion": "i phone",
        "cost": 1666,
        "category_id": 1,
        "createdAt": "2022-09-23T11:46:56.000Z",
        "updatedAt": "2022-09-23T11:46:56.000Z"
    }
]

test('when getProductByCategoryId is called , it should return all the product from the perticular category',

async()=>{
    const spy = jest.spyOn(ProductServices, 'getProductByCategoryId').mockReturnValue(getProductByCategoryIdResponse);

const req = mockRequest();
const res = mockResponse()
const result = await ProductController.getProductByCategoryId(req,res);
expect(spy).toHaveBeenCalled();
expect(result.json).toHaveBeenCalledWith({
    message: 'successfully fatched products',
    success: true,
    code: 200,
    data: getProductByCategoryIdResponse
})
})
