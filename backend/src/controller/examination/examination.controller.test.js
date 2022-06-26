
require('dotenv').config();
const config = require('config');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');
const mongoose = require('mongoose');

const examinationService = require('./examination.service');
const examinationController = require('./examination.controller');
const userService = require('../user/user.service');

mongoose.Promise = global.Promise;

if (!config.has('database')) {
  console.error('Database settings not found');
  process.exit();
}

jest.mock('./examination.service');

describe("Examination controller", () => {
  
  let createdUser;

  const createTestUser = {
    userName: 'test',
    password: 'test',
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    role: 1,
  }

  
  const jestTestUser = {
    userName: 'test',
    password: 'test',
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    role: 1,
  }
  const mockData = [{
    _id: '1',
    name: 'Test',
    defaultTime: 10,
    createdBy: ''
  },
  {
    _id: '2',
    name: 'Test',
    defaultTime: 20,
    createdBy: ''
  }];

  let response;

  const nextFunction = jest.fn((error) => {
    // console.log(error);
  })

  beforeAll((done) => {
    // Be kell húznom egy mongo connectet, mert a Model.validate
    // idvalidatorral együtt conenction nélkül
    // nem annyira működik jól.
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
      createdUser = await userService.registerUser(createTestUser);
      done();
    });

  });

  afterAll((done) => {
    mongoose.connection.db.dropDatabase( () => {
      mongoose.connection.close( () => {
          done()
      } )
  } )
  })

  beforeEach(() => {
    examinationService.__setMockData(mockData)
    response = mockResponse()
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findAll should return all of the data', () => {
    const request = mockRequest({});

    return examinationController.findAll(request, response, nextFunction)
      .then(() => {

        let exceptedResponse = [...mockData];
        exceptedResponse = exceptedResponse.map((item) => item.createdBy = jestTestUser);

        expect(examinationService.findAll).toBeCalled()
        expect(response.json).toBeCalledWith(exceptedResponse)
      })
  });

  test('finById with correct id should return one record', () => {
    const EXAM_ID = "1";
    const request = mockRequest({
      params: {
        id: EXAM_ID
      }
    })

    return examinationController.findById(request, response, nextFunction)
      .then(() => {

        let exceptedResponse = { ...mockData[0] };
        exceptedResponse.createdBy = jestTestUser;

        expect(examinationService.findById).toBeCalled()
        expect(response.json).toBeCalledWith(exceptedResponse)
      })
  });

  test('Create with correct data shoud save data and return it.', () => {
    const examData = {
      name: 'saveTest',
      defaultTime: 10,
      createdBy: ''
    };
    const newId = new mongoose.Types.ObjectId();
    const request = mockRequest({
      body: { ...examData },
      user: {
        _id: createdUser._id
      },
    });

    return examinationController.create(request, response, nextFunction, true)
      .then(() => {
        expect(examinationService.create).toBeCalled()
        expect(response.json).toBeCalledWith(
          {
            _id: expect.any(String),
            name: examData.name,
            defaultTime: 10,
            createdBy: createdUser._id
          }
        )
      })
  });

  test('Create without name shoud generate error.', () => {
    const examData = {
      defaultTime: 10,
      createdBy: ''
    };

    const expectedErrorWhenNameMissing = new createError.BadRequest('Examination validation failed: name: Path `name` is required.');

    const request = mockRequest({
      body: { ...examData },
      user: {
        _id: createdUser._id
      },
    });

    return examinationController.create(request, response, nextFunction, true)
      .then(() => {
        expect(nextFunction).toBeCalledWith(expectedErrorWhenNameMissing)
      })
  });

  test('Updating valid record with valid data should return updated record.', () => {
    const EXAM_ID = "1";
    const examData = {
      name: 'repaced_name',
      defaultTime: 20,
    };

    const request = mockRequest({
      body: { ...examData },
      user: {
        _id: createdUser._id
      },
      params: {
        id: EXAM_ID
      }
    });

    return examinationController.update(request, response, nextFunction, true)
      .then(() => {
        expect(examinationService.update).toBeCalledWith(EXAM_ID, examData)
        expect(response.json).toBeCalledWith(
          {
            _id: "1",
            name: examData.name,
            defaultTime: examData.defaultTime,
            createdBy: jestTestUser
          }
        )
      })
  });

  test('Deleting existing record should return with deleted record and propagate softdelete fields', () => {
    const EXAM_ID = "1";
    const USER_ID = 'TEST_USER_ID';
    const request = mockRequest({
      user: {
        _id: USER_ID
      },
      params: {
        id: EXAM_ID
      }
    });

    return examinationController.delete(request, response, nextFunction, true)
      .then(() => {
        expect(examinationService.remove).toBeCalledWith(EXAM_ID, USER_ID)
        expect(response.json).toBeCalledWith(
          {
            _id: "1",
            name: mockData[0].name,
            defaultTime: mockData[0].defaultTime,
            createdBy: jestTestUser,
            deleted: true,
            deletedAt: 'deleted_date_here',
            deletedBy: USER_ID,
          }
        )
      })
  });

  test('Non existing record deletion should return 404', () => {
    const EXAM_ID = "9999";
    const USER_ID = 'TEST_USER_ID';
    const request = mockRequest({
      user: {
        _id: USER_ID
      },
      params: {
        id: EXAM_ID
      }
    });

    const deleteError = new createError.NotFound(`Hiba történt a rekord törlése közben: ${EXAM_ID}. `)

    return examinationController.delete(request, response, nextFunction, true)
      .then(() => {
        expect(examinationService.remove).toBeCalledWith(EXAM_ID, USER_ID)
        expect(nextFunction).toBeCalledWith(deleteError)
        
      })
  });

})