
require('dotenv').config();
const config = require('config');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');
const mongoose = require('mongoose');

const consultationService = require('./consultation.service');
const consultationController = require('./consultation.controller');

const examinationService = require('../examination/examination.service');
const examinationGroupService = require('../examinationGroup/examinationGroup.service');
const userService = require('../user/user.service');

mongoose.Promise = global.Promise;

if (!config.has('database')) {
  console.error('Database settings not found');
  process.exit();
}

jest.mock('./consultation.service');

describe("Consultation controller", () => {

  let createdExaminations = [];
  let createdGroup;
  let createdUser;

  const examintaionsToCreate = [
    { name: 'teszt 1', defaultTime: 0, },
    { name: 'teszt 2', defaultTime: 0, },
  ];

  const examinationGroupToCreate = {
    name: 'csoport teszt név',
    examinations: [],
  };

  const createTestUser = {
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
    startDate: '2022-02-22T00:00:00',
    doctor: 'doctor_id',
    groupId: 'group_id',
    examinations: [],
    logEntries: [],
    details: [],
  },{
    _id: '2',
    name: 'Test2',
    startDate: '2022-02-22T00:00:00',
    doctor: 'doctor_id2',
    groupId: 'group_id2',
    examinations: [],
    logEntries: [],
    details: [],
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
      createdExaminations[0] = await examinationService.create(examintaionsToCreate[0]);
      createdExaminations[1] = await examinationService.create(examintaionsToCreate[1]);
      createdUser = await userService.registerUser(createTestUser);
      examinationGroupToCreate.examinations = createdExaminations;
      createdGroup = await examinationGroupService.create(examinationGroupToCreate);
      await examinationGroupService.addExaminations(createdGroup._id, createdExaminations);
      createdGroup = await examinationGroupService.findById(createdGroup._id);
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
    consultationService.__setMockData(mockData)
    response = mockResponse()
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findAll should return all of the data', () => {
    const request = mockRequest({});

    return consultationController.findAll(request, response, nextFunction)
      .then(() => {

        let exceptedResponse = [...mockData];

        expect(consultationService.findAll).toBeCalled()
        expect(response.json).toBeCalledWith(exceptedResponse)
      })
  });

  test('finById with correct id should return one record', () => {
    const CONS_ID = "1";
    const request = mockRequest({
      params: {
        id: CONS_ID
      }
    })

    return consultationController.findById(request, response, nextFunction)
      .then(() => {

        let exceptedResponse = { ...mockData[0] };

        expect(consultationService.findById).toBeCalled()
        expect(response.json).toBeCalledWith(exceptedResponse)
      })
  });

  test('Create with correct data shoud save data and return it.', () => {
    const now = new Date();
    const examData = {
      name: 'teszt create',
      startDate: now,
      doctor: createdUser._id,
      groupId: createdGroup._id,
    };

    let order = 1;
    const exceptedGroups = createdExaminations.map(exam => {
      const ret = {};
      ret.order = order;
      ret.examination = exam._id;
      order++;
      return ret;
    });

    const request = mockRequest({
      body: { ...examData },
    });

    return consultationController.create(request, response, nextFunction)
      .then(() => {
        expect(consultationService.create).toBeCalled()
        expect(response.json).toBeCalledWith(
          {
            _id: expect.any(String),
            doctor: createdUser._id,
            examinations: exceptedGroups,
            groupId: createdGroup._id,
            name: examData.name,
            startDate: examData.startDate,
          }
        )
      })
  });

  test('Updating valid record with valid data should return updated record.', () => {
    const CONS_ID = "1";
    const now = new Date();
    const examData = {
      name: 'teszt create',
      startDate: now,
      doctor: createdUser._id,
      groupId: createdGroup._id,     
    };

    let order = 1;
    const exceptedGroups = createdExaminations.map(exam => {
      const ret = {};
      ret.order = order;
      ret.examination = exam._id;
      order++;
      return ret;
    });

    const request = mockRequest({
      body: { ...examData },
      params: {
        id: CONS_ID
      }
    });

    return consultationController.update(request, response, nextFunction)
      .then(() => {
        expect(consultationService.update).toBeCalledWith(CONS_ID, examData)
        expect(response.json).toBeCalledWith(
          {
            _id: "1",
            doctor: createdUser._id,
            examinations: [],
            groupId: createdGroup._id,
            name: examData.name,
            startDate: examData.startDate,
            details: [],
            logEntries: [],
          }
        )
      })
  });

})