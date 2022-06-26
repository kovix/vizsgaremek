
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { json } = require('express/lib/response');
const createError = require('http-errors');

const authController = require('./auth.controller');
const authService = require('./auth.service');
const jestConfig = require('../../../jest.config');

jest.mock('./auth.service');

describe("Person controller", () => {
  const mockData = [{
    "id": "1",
    "userName": "TestUser1",
    "password": "123456",
    "firstName": "Test1",
    "lastName": "Test2",
    "email": "user@user.com",
    "role": 1,
  },
  {
    "id": "2",
    "userName": "TestUser2",
    "password": "123456",
    "firstName": "Test3",
    "lastName": "Test4",
    "email": "user@user.com",
    "role": 2,
  }];

  let response;

  const nextFunction = jest.fn((error) => {
    // console.log(error);
  })

  beforeEach(() => {
    authService.__setMockData(mockData)
    response = mockResponse()
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Validate login with correct data", () => {
    const loginData = {
      userName: "TestUser1",
      password: "123456"
    };
    const request = mockRequest({
        body: loginData
    }) 

    return authController.validateLogin(request, response, nextFunction)
    .then(() => {
      expect(authService.validateLogin).toBeCalledWith(loginData.userName, loginData.password)
      expect(response.json).toBeCalledWith(
        {
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
          user: mockData[0],
        }
      )
    })
  });

  test("Validate invalid (empty) refresh Token", () => {
    const mockData = {
      refreshToken: ""
    };
    const request = mockRequest({
        body: mockData
    }) 

    const error = new createError.Unauthorized('A művelet nem teljeíthető');

    return authController.refreshToken(request, response, nextFunction)
    .then(() => {
      expect(nextFunction).toBeCalledWith(error)
    })
  });

  test("Logout should always return success", () => {
    const mockData = {
      refreshToken: ""
    };
    const request = mockRequest({
        body: mockData
    }) 

    return authController.logout(request, response, nextFunction)
    .then(() => {
      expect(response.json).toBeCalledWith(
        {
         success: true,
        }
      )
    })
  });


})