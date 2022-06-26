
require('dotenv').config();
const config = require('config');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');
const mongoose = require('mongoose');

const examinationGroupService = require('./examinationGroup.service');
const examinationGroupController = require('./examinationGroup.controller');

const examinationService = require('../examination/examination.service');

mongoose.Promise = global.Promise;

if (!config.has('database')) {
  console.error('Database settings not found');
  process.exit();
}

jest.mock('./examinationGroup.service');

describe("ExaminationGruop controller", () => {

  let createdExaminations = [];

  const examintaionsToCreate = [
    { name: 'teszt 1', defaultTime: 0, },
    { name: 'teszt 2', defaultTime: 0, },
  ];

  const mockData = [{
    _id: '1',
    name: 'Test',
    examinations: [],
  }, {
    _id: '2',
    name: 'Test2',
    examinations: [],
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
      const thirdMockRecord = {
        _id: '3',
        name: 'Harmadik rekord',
        examinations: JSON.parse(JSON.stringify(createdExaminations)),
      }
      mockData.push(thirdMockRecord);
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
    examinationGroupService.__setMockData(mockData)
    response = mockResponse()
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('findAll should return all of the data', () => {
    const request = mockRequest({});

    return examinationGroupController.findAll(request, response, nextFunction)
      .then(() => {

        let exceptedResponse = [...mockData];

        expect(examinationGroupService.findAll).toBeCalled()
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

    return examinationGroupController.findById(request, response, nextFunction)
      .then(() => {

        let exceptedResponse = { ...mockData[0] };

        expect(examinationGroupService.findById).toBeCalled()
        expect(response.json).toBeCalledWith(exceptedResponse)
      })
  });

  test('Create with correct data shoud save data and return it.', () => {
    const examData = {
      name: 'saveTest',
    };
    const newId = new mongoose.Types.ObjectId();
    const request = mockRequest({
      body: { ...examData },
    });

    return examinationGroupController.create(request, response, nextFunction)
      .then(() => {
        expect(examinationGroupService.create).toBeCalled()
        expect(response.json).toBeCalledWith(
          {
            _id: expect.any(String),
            name: examData.name
          }
        )
      })
  });

  test('Updating valid record with valid data should return updated record.', () => {
    const EXAM_ID = "1";
    const examData = {
      name: 'repaced_name',
    };

    const request = mockRequest({
      body: { ...examData },
      params: {
        id: EXAM_ID
      }
    });

    return examinationGroupController.update(request, response, nextFunction)
      .then(() => {
        expect(examinationGroupService.update).toBeCalledWith(EXAM_ID, examData)
        expect(response.json).toBeCalledWith(
          {
            _id: "1",
            name: examData.name,
            examinations: expect.any(Array),
          }
        )
      })
  });

  test('Adding examinations should populate examinations_array.', () => {
    const EXAM_ID = "1";
    const examData = createdExaminations.map(exam => exam._id);
    let order = 1;
    const expectedArray = createdExaminations.map(exam => {
      ret = {};
      ret.examination = exam._id;
      ret.order = order;
      order++;
      return ret;
    });

    const request = mockRequest({
      body: examData,
      params: {
        id: EXAM_ID
      }
    });

    return examinationGroupController.addExaminations(request, response, nextFunction)
      .then(() => {
        expect(examinationGroupService.addExaminations).toBeCalledWith(EXAM_ID, examData)
        expect(response.json).toBeCalledWith(
          {
            _id: "1",
            name: mockData[0].name,
            examinations: expectedArray,
          }
        )
      })
  });

  test('Reordering examinations should populate the passed array as examinations_array.', () => {
    const EXAM_ID = "1";
    const examData = createdExaminations.map(exam => exam._id);
    let order = 0;
    const expectedArray = createdExaminations.map(exam => {
      ret = {};
      ret.examination = exam._id;
      ret.order = order;
      order++;
      return ret;
    });

    const request = mockRequest({
      body: examData,
      params: {
        id: EXAM_ID
      }
    });

    return examinationGroupController.saveReorder(request, response, nextFunction)
      .then(() => {
        expect(examinationGroupService.reorderExaminations).toBeCalledWith(EXAM_ID, examData)
        expect(response.json).toBeCalledWith(
          {
            _id: "1",
            name: mockData[0].name,
            examinations: expectedArray,
          }
        )
      })
  });

  test('Removing one examination should work.', () => {
    const EXAM_ID = "3";

    let expectedArray = createdExaminations.filter(exam => exam._id.toString() !== createdExaminations[1]._id.toString());
    
    expectedArray = JSON.parse(JSON.stringify(expectedArray));

    const request = mockRequest({
      params: {
        id: EXAM_ID,
        examid: createdExaminations[1]._id.toString(),
      }
    });

    return examinationGroupController.removeExamination(request, response, nextFunction)
      .then(() => {
        expect(examinationGroupService.removeExamination).toBeCalledWith(EXAM_ID, createdExaminations[1]._id.toString())
        expect(response.json).toBeCalledWith(
          {
            _id: EXAM_ID,
            name: mockData[2].name,
            examinations: expectedArray,
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

    return examinationGroupController.delete(request, response, nextFunction, true)
      .then(() => {
        expect(examinationGroupService.remove).toBeCalledWith(EXAM_ID, USER_ID)
        expect(response.json).toBeCalledWith(
          {
            _id: "1",
            name: mockData[0].name,
            examinations: expect.any(Array),
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

    return examinationGroupController.delete(request, response, nextFunction, true)
      .then(() => {
        expect(examinationGroupService.remove).toBeCalledWith(EXAM_ID, USER_ID)
        expect(nextFunction).toBeCalledWith(deleteError)

      })
  });

})