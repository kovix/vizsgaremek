
require('dotenv').config();
const config = require('config');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');
const mongoose = require('mongoose');

const patientService = require('./patient.service');
const patientontroller = require('./patient.controller');
const userService = require('../user/user.service');

mongoose.Promise = global.Promise;

if (!config.has('database')) {
  console.error('Database settings not found');
  process.exit();
}

jest.mock('./patient.service');

describe("Patient controller", () => {

  let createdUser;

  const createTestUser = {
    userName: 'test',
    password: 'test',
    firstName: 'test',
    lastName: 'test',
    email: 'test99@test.com',
    role: 1,
  }

  const jestTestUser = {
    userName: 'test',
    password: 'test',
    firstName: 'test',
    lastName: 'test',
    email: 'test0@test.com',
    role: 1,
  }

  const mockData = [{
    _id: '1',
    firstName: 'Teszt1',
    lastName: 'Paciens1',
    email: 'tesz1@jest.com',
    patientID: '000 111 222',
    comment: 'test comment',
  }, {
    _id: '2',
    firstName: 'Teszt2',
    lastName: 'Paciens2',
    email: 'tesz2@jest.com',
    patientID: '000 111 333',
    comment: 'test comment',
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
      await db.dropDatabase();
      createdUser = await userService.registerUser(createTestUser);
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
    patientService.__setMockData(mockData)
    response = mockResponse()
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findAll should return all of the data', () => {
    const request = mockRequest({});

    return patientontroller.findAll(request, response, nextFunction)
      .then(() => {
        let exceptedResponse = [...mockData];
        exceptedResponse = exceptedResponse.map((item) => item.createdBy = jestTestUser);
        expect(patientService.findAll).toBeCalled()
        expect(response.json).toBeCalledWith(exceptedResponse)
      })
  });

  test('findById with correct id should return one record', () => {
    const PATIENT_ID = "1";
    const request = mockRequest({
      params: {
        id: PATIENT_ID
      }
    })

    return patientontroller.findById(request, response, nextFunction)
      .then(() => {
        let exceptedResponse = { ...mockData[0] };
        exceptedResponse.createdBy = jestTestUser;
        expect(patientService.findById).toBeCalled()
        expect(response.json).toBeCalledWith(exceptedResponse)
      })
  });

  test('Create with correct data shoud save data and return it.', () => {
    const patientData = {
      firstName: 'Teszt',
      lastName: 'Create',
      patientID: '555 666 888',
      email: 'teszt1@teszt.com',
      comment: 'A smaple comment',
    };
    const newId = new mongoose.Types.ObjectId();
    const request = mockRequest({
      body: { ...patientData },
      user: {
        _id: createdUser._id
      },
    });

    return patientontroller.create(request, response, nextFunction, true)
      .then(() => {
        expect(patientService.create).toBeCalled()
        expect(response.json).toBeCalledWith(
          {
            _id: expect.any(String),
            firstName: patientData.firstName,
            lastName: patientData.lastName,
            patientID: patientData.patientID,
            email: patientData.email,
            comment: patientData.comment,
            createdBy: createdUser._id,
          }
        )
      })
  });

  test('Create without firstName shoud generate error.', () => {
    const patientData = {
      lastName: 'Create',
      patientID: '555 666 888',
      email: 'teszt2@teszt.com',
      comment: 'A smaple comment',
    };

    const expectedErrorWhenNameMissing = new createError.BadRequest('Patient validation failed: firstName: A vezetéknév megadása kötelező!');

    const request = mockRequest({
      body: { ...patientData },
      user: {
        _id: createdUser._id
      },
    });

    return patientontroller.create(request, response, nextFunction, true)
      .then(() => {
        expect(nextFunction).toBeCalledWith(expectedErrorWhenNameMissing)
      })
  });

  test('Create without lastName shoud generate error.', () => {
    const patientData = {
      firstName: 'Create',
      patientID: '555 666 888',
      email: 'teszt2@teszt.com',
      comment: 'A smaple comment',
    };

    const expectedErrorWhenNameMissing = new createError.BadRequest('Patient validation failed: lastName: A keresztnév megadása kötelező!');

    const request = mockRequest({
      body: { ...patientData },
      user: {
        _id: createdUser._id
      },
    });

    return patientontroller.create(request, response, nextFunction, true)
      .then(() => {
        expect(nextFunction).toBeCalledWith(expectedErrorWhenNameMissing)
      })
  });

  test('Create with invalid TAJ shoud generate error.', () => {
    const patientData = {
      firstName: 'Create',
      lastName: 'Create',
      patientID: 'abcdefg',
      email: 'teszt2@teszt.com',
      comment: 'A smaple comment',
    };

    const expectedErrorWhenNameMissing = new createError.BadRequest('Patient validation failed: patientID: A TAJ szám érvénytelen!');

    const request = mockRequest({
      body: { ...patientData },
      user: {
        _id: createdUser._id
      },
    });

    return patientontroller.create(request, response, nextFunction, true)
      .then(() => {
        expect(nextFunction).toBeCalledWith(expectedErrorWhenNameMissing)
      })
  });
  test('Create with invalid e-mail shoud generate error.', () => {
    const patientData = {
      firstName: 'Create',
      lastName: 'Create',
      patientID: '000 111 666',
      email: 'a@b.c',
      comment: 'A smaple comment',
    };

    const expectedErrorWhenNameMissing = new createError.BadRequest('Patient validation failed: email: A megadott E-mail cím érvénytelen!');

    const request = mockRequest({
      body: { ...patientData },
      user: {
        _id: createdUser._id
      },
    });

    return patientontroller.create(request, response, nextFunction, true)
      .then(() => {
        expect(nextFunction).toBeCalledWith(expectedErrorWhenNameMissing)
      })
  });


  test('Updating valid record with valid data should return updated record.', () => {
    const PATIENT_ID = "1";
    const patientData = {
      firstName: 'repaced_first_name',
      lastName: 'repaced_last_name',
      email: 'replacedemail@test.com',
      patientID: '999 999 998',
    };

    const request = mockRequest({
      body: { ...patientData },
      user: {
        _id: createdUser._id
      },
      params: {
        id: PATIENT_ID
      }
    });

    return patientontroller.update(request, response, nextFunction, true)
      .then(() => {
        expect(patientService.update).toBeCalledWith(PATIENT_ID, patientData)
        expect(response.json).toBeCalledWith(
          {
            _id: "1",
            firstName: patientData.firstName,
            lastName: patientData.lastName,
            patientID: patientData.patientID,
            email: patientData.email,
            comment: mockData[0].comment,
            createdBy: jestTestUser
          }
        )
      })
  });

  test('Deleting existing record should return with deleted record and propagate softdelete fields', () => {
    const PATIENT_ID = "1";
    const USER_ID = 'TEST_USER_ID';
    const request = mockRequest({
      user: {
        _id: USER_ID
      },
      params: {
        id: PATIENT_ID
      }
    });

    return patientontroller.delete(request, response, nextFunction, true)
      .then(() => {
        expect(patientService.remove).toBeCalledWith(PATIENT_ID, USER_ID)
        expect(response.json).toBeCalledWith(
          {
            _id: "1",
            firstName: mockData[0].firstName,
            lastName: mockData[0].lastName,
            patientID: mockData[0].patientID,
            email: mockData[0].email,
            comment: mockData[0].comment,
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

    return patientontroller.delete(request, response, nextFunction, true)
      .then(() => {
        expect(patientService.remove).toBeCalledWith(EXAM_ID, USER_ID)
        expect(nextFunction).toBeCalledWith(deleteError)

      })
  });

})