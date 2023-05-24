const authController = require('../../controller/auth.controller')
const authService =require('../../services/auth.services')
const {mockRequest,mockResponse}=require('./mocker')

const signUpData= 

    {
        "id": 1,
        "email": "abc@gmail.com",
        "password": "$2a$10$1B9biCXwUCHOkVaYeIze7uiB.miVBKxd4k079xLp/w6Tqhs6siYfe",
        "username": "abc",
        "updatedAt": "2022-09-27T12:46:49.112Z",
        "createdAt": "2022-09-27T12:46:49.112Z"
    }



test('when user signup, it return response ',async ()=>{

const spy= jest.spyOn(authService,'signup').mockReturnValue(signUpData)
const req=mockRequest();
const res =mockResponse();
const result =await authController.signup(req,res);
expect(spy).toHaveBeenCalled();
expect(result.json).toHaveBeenCalled();
expect(result.json).toHaveBeenCalledWith({
    
        "message": "succsessfull signup",
        "code": 200,
        "success": true,
        "data": signUpData
    
})


})

const signInData ={
    "message": "successfully sign in ",
    "code": 200,
    "success": true,
    "data": {
        "id": 1,
        "email": "abc@gmail.com",
        "password": "$2a$10$1B9biCXwUCHOkVaYeIze7uiB.miVBKxd4k079xLp/w6Tqhs6siYfe",
        "username": "abc",
        "createdAt": "2022-09-27T12:46:49.000Z",
        "updatedAt": "2022-09-27T12:46:49.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQxQjliaUNYd1VDSE9rVmFZZUl6ZTd1aUIubWlWQkt4ZDRrMDc5eExwL3c2VHFoczZzaVlmZSIsInVzZXJuYW1lIjoiYWJjIiwiaWF0IjoxNjY0MjgzNDM4LCJleHAiOjE2NjQyOTA2Mzh9.Q364S57fguOUup_qkkI7upKPLxAsV0JQAum0saZMkKU"
}