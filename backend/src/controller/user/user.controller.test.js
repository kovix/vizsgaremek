
require('dotenv').config();
const config = require('config');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');
const mongoose = require('mongoose');

const userService = require('./user.service');
const userController = require('./user.controller');


jest.mock('./user.service');

describe("User controller", () => {


  const mockData = [{
    _id: '1',
    userName: 'teszt1',
    password: 'pass1',
    firstName: 'Teszt1',
    lastName: 'USer1',
    email: 'tesz1@jest.com',
    role: 1
  }, {
    _id: '2',
    userName: 'teszt2',
    password: 'pass2',
    firstName: 'Teszt2',
    lastName: 'USer2',
    email: 'tesz2@jest.com',
    role: 2
  }];

  let response;

  const nextFunction = jest.fn((error) => {
    // console.log(error);
  })

  beforeAll((done) => {
    // Be kell húznom egy mongo connectet, mert a Model validáció
    // igényli.
    const {
      username,
      password,
      host,
      database,
    } = config.get('database');

    mongoose.connect(`mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`, {
      useNewUrlparser: true,
      useUnifiedTopology: true,
    });
    let db = mongoose.connection;

    db.on('error', (err) => {
      done.fail(err);
    });

    db.once('open', async () => {
      await db.dropDatabase(); //megcsinálja újra...
      done();
    });

  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => {
        done()
      })
    })
  })

  beforeEach(() => {
    userService.__setMockData(mockData)
    response = mockResponse()
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findAll should return all of the data without password', () => {
    const request = mockRequest({});

    return userController.findAll(request, response, nextFunction)
      .then(() => {
        let exceptedResponse = JSON.parse(JSON.stringify(mockData));
        exceptedResponse = exceptedResponse.map((item) => {
          delete item.password;
          return item;
        })
        expect(userService.findAll).toBeCalled()
        expect(response.json).toBeCalledWith(exceptedResponse)
      })
  });

  test('findById with correct id should return one record without its password', () => {
    const USER_ID = "1";
    const request = mockRequest({
      params: {
        id: USER_ID
      }
    })

    return userController.findById(request, response, nextFunction)
      .then(() => {
        let exceptedResponse = { ...mockData[0] };
        delete exceptedResponse.password;
        expect(userService.findById).toBeCalled()
        expect(response.json).toBeCalledWith(exceptedResponse)
      })
  });

  test('Create with correct data shoud save data and return it.', () => {
    const userData = {
      userName: 'teszt_create_user',
      password: 'teszt_create_pass',
      confirmPassword: 'teszt_create_pass',
      firstName: 'Teszt_create_firstName',
      lastName: 'Teszt_create_lastName',
      email: 'teszt1@teszt.com',
      role: 3,
    };
    const request = mockRequest({
      body: { ...userData },
    });

    return userController.create(request, response, nextFunction)
      .then(() => {
        expect(userService.registerUser).toBeCalled()
        expect(response.json).toBeCalledWith(
          {
            _id: expect.any(String),
            userName: userData.userName,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
          }
        )
      })
  });

  test('Create with different passwords should return error.', () => {
    const userData = {
      userName: 'teszt_create_user',
      password: 'teszt_create_pass',
      confirmPassword: 'teszt_create_pass_different',
      firstName: 'Teszt_create_firstName',
      lastName: 'Teszt_create_lastName',
      email: 'teszt1@teszt.com',
      role: 3,
    };
    const request = mockRequest({
      body: { ...userData },
    });

    const error = new createError.BadRequest('A megadott jelszavak eltérőek!');

    return userController.create(request, response, nextFunction)
      .then(() => {
        expect(nextFunction).toBeCalledWith(error)
      })
  });

  test('Updating valid record with valid data should return updated record.', () => {
    const USER_ID = "1";
    const userData = {
      userName: 'replaced_user_name',
      firstName: 'repaced_first_name',
      lastName: 'repaced_last_name',
      email: 'replacedemail@test.com',
      role: 1
    };

    const request = mockRequest({
      body: { ...userData },
      params: {
        id: USER_ID
      }
    });

    return userController.update(request, response, nextFunction)
      .then(() => {
        expect(userService.update).toBeCalledWith(USER_ID, userData)
        expect(response.json).toBeCalledWith(
          {
            _id: "1",
            userName: userData.userName,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
          }
        )
      })
  });
})