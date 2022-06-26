require('dotenv').config();

const config = require('config');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('./server');

mongoose.Promise = global.Promise;

const consultationModel = require('./model/consultation.model');
const examinationModel = require('./model/examination.model');
const examinationGroupModel = require('./model/examinationGroup.model');
const patientModel = require('./model/patient.model');
const userModel = require('./model/user.model');

let token;

beforeEach(done => {

  mongoose.Promise = global.Promise;
  const {
    username,
    password,
    host,
    database,
  } = config.get('database');

  mongoose.connect(`mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  }).then(async () => {
    try {
      const user = new userModel({
        userName: 'superTest',
        firstName: 'Teszt',
        lastName: 'Elek',
        email: 'supertest@kovix.info',
        password: '123456',
        role: 1
      });

      await user.save().then(() => {
        return supertest(app)
          .post('/auth/login')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({ userName: "superTest", "password": "123456" })
          .expect(200)
          .then((response) => {
            token = response.body.accessToken;
            done()
          })
      }).catch(err => console.log(err))
    } catch (error) {
      console.log(error);
      process.exit
    }
  }).catch((err) => {
    console.error(`Error connecting to mongo database: ${host}/${database}. Error is: ${err.message}`);
    process.exit();
  });
});

afterEach(done => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
});


describe('/patients', () => {
  const insertData = [
    {
      firstName: 'teszt',
      lastName: 'name1',
      patientID: '111 111 111',
      email: 'teszt1@test.com',
      comment: 'comment1'
    },
    {
      firstName: 'teszt2',
      lastName: 'name2',
      patientID: '111 111 112',
      email: 'teszt2@test.com',
      comment: 'comment2'
    },
  ];

  let firstId

  beforeEach(() => {
    return patientModel.insertMany(insertData).then((patients) => firstId = patients[0]._id)
  })
  afterEach(() => mongoose.connection.dropCollection('patients'))

  test('GET /patient', done => {
    supertest(app).get('/patient').set('Authorization', 'Bearer ' + token).expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toBe(insertData.length)
        response.body.forEach((patient, index) => {
          expect(patient.patientID).toBe(insertData[index].patientID)
        });
        done();
      }).catch(err => console.error(err))
  });

  test('GET /patient/:id', done => {
    supertest(app).get(`/patient/${firstId}`)
      .set('Authorization', 'Bearer ' + token).expect(200)
      .then(response => {
        const patient = response.body
        expect(patient.name).toBe(insertData[0].name)
        done()
      }).catch(err => console.error(err))
  })

});


describe('/users', () => {
  const insertData = [
    {
      userName: 'user1',
      firstName: 'teszt',
      lastName: 'name1',
      email: 'teszt1@test.com',
      password: '123456',
      role: 1
    },
    {
      userName: 'user2',
      firstName: 'teszt2',
      lastName: 'name2',
      email: 'teszt2@test.com',
      password: '123456',
      role: 2
    },
  ];

  let firstId

  beforeEach(() => {
    return userModel.insertMany(insertData).then((users) => firstId = users[1]._id) //first is superadmin
  })
  afterEach(() => mongoose.connection.dropCollection('users'))

  test('GET /user', done => {
    supertest(app).get('/user').set('Authorization', 'Bearer ' + token).expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toBe(insertData.length + 1)
        response.body.forEach((user, index) => {
          if (index > 0) expect(user.userName).toBe(insertData[index - 1].userName);
        });
        done();
      }).catch(err => console.error(err))
  });

  test('GET /user/:id', done => {
    supertest(app).get(`/user/${firstId}`)
      .set('Authorization', 'Bearer ' + token).expect(200)
      .then(response => {
        const user = response.body
        expect(user.userName).toBe(insertData[1].userName)
        done()
      }).catch(err => console.error(err))
  })

});

describe('/examination', () => {
  const insertData = [
    {
      name: 'teszt 1',
      defaultTime: 10,
    },
    {
      name: 'teszt 2',
      defaultTime: 20,
    },
  ];

  let firstId

  beforeEach(() => {
    return examinationModel.insertMany(insertData).then((exams) => firstId = exams[0]._id)
  })
  afterEach(() => mongoose.connection.dropCollection('examinations'))

  test('GET /examination', done => {
    supertest(app).get('/examination').set('Authorization', 'Bearer ' + token).expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toBe(insertData.length)
        response.body.forEach((examination, index) => {
          expect(examination.name).toBe(insertData[index].name);
        });
        done();
      }).catch(err => console.error(err))
  });

  test('GET /examination/:id', done => {
    supertest(app).get(`/examination/${firstId}`)
      .set('Authorization', 'Bearer ' + token).expect(200)
      .then(response => {
        const examination = response.body
        expect(examination.name).toBe(insertData[0].name)
        done()
      }).catch(err => console.error(err))
  })

});

describe('/examinationgroup', () => {
  const insertData = [
    {
      name: 'teszt 1',
    },
    {
      name: 'teszt 2',
    },
  ];

  let firstId

  beforeEach(() => {
    return examinationGroupModel.insertMany(insertData).then((examgs) => firstId = examgs[0]._id)
  })
  afterEach(() => mongoose.connection.dropCollection('examinationgroups'))

  test('GET /examinationgroup', done => {
    supertest(app).get('/examinationgroup').set('Authorization', 'Bearer ' + token).expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toBe(insertData.length)
        response.body.forEach((examinationGroup, index) => {
          expect(examinationGroup.name).toBe(insertData[index].name);
        });
        done();
      }).catch(err => console.error(err))
  });

  test('GET /examinationgroup/:id', done => {
    supertest(app).get(`/examinationgroup/${firstId}`)
      .set('Authorization', 'Bearer ' + token).expect(200)
      .then(response => {
        const examinationGroup = response.body
        expect(examinationGroup.name).toBe(insertData[0].name)
        done()
      }).catch(err => console.error(err))
  })

});


describe('/consultation', () => {
  let createdExaminations;
  let createdGroup;
  let createdUser;
  
  let generatedMock;

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

  let firstId

  beforeEach(async () => {
    createdExaminations= await examinationModel.insertMany(examintaionsToCreate);

    let order = 1;
    const convertedExaminations = createdExaminations.map(exam => {
      const ret = {};
      ret.examination = exam._id,
      ret.order = order;
      order++;
      return ret;
    });

    createdUser = await userModel.create(createTestUser);
    examinationGroupToCreate.examinations = convertedExaminations;
    createdGroup = await examinationGroupModel.create(examinationGroupToCreate);

    const mockData = [
      {
        name: 'teszt 1',
        startDate: new Date(),
        doctor: createdUser._id,
        groupId: createdGroup._id,
        examinations: convertedExaminations,
        logEntries: [],
        closed: false,
        details: []
      },
      {
        name: 'teszt 2',
        startDate: new Date(),
        doctor: createdUser._id,
        groupId: createdGroup._id,
        examinations: convertedExaminations,
        logEntries: [],
        closed: false,
        details: []
      }
    ];
    generatedMock = mockData;

    return consultationModel.insertMany(mockData).then((cons) => firstId = cons[0]._id)
  })
  afterEach(() => mongoose.connection.dropCollection('consultations'))

  test('GET /consultation', done => {
    supertest(app).get('/consultation').set('Authorization', 'Bearer ' + token).expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toBe(generatedMock.length)
        response.body.forEach((consultation, index) => {
          expect(consultation.name).toBe(generatedMock[index].name);
        });
        done();
      }).catch(err => console.error(err))
  });

  test('GET /consultation/:id', done => {
    supertest(app).get(`/consultation/${firstId}`)
      .set('Authorization', 'Bearer ' + token).expect(200)
      .then(response => {
        const consultation = response.body
        expect(consultation.name).toBe(generatedMock[0].name)
        done()
      }).catch(err => console.error(err))
  })

});
