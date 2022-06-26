require('dotenv').config();

const config = require('config');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('./server');

mongoose.Promise = global.Promise;

const consultationModel = require('./model/consultation.model');
const examinationModel = require('./model/examination.model');
const examinationGroupModel = require('./model/consultation.model');
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