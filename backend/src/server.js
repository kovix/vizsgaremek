const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('../config/logger');
const jwtMiddleware = require('./middleware/jwt.middleware');

// const yaml = require('yamljs')
// const swaggerUI = require('swagger-ui-express');

const app = express();

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
}).then(() => {
  logger.info(`Mongodb connected to host ${host}/${database}`);
}).catch((err) => {
  logger.error(`Error connecting to mongo database: ${host}/${database}. Error is: ${err.message}`);
  process.exit();
});

// const swaggerDocument = yaml.load('./docs/swagger.yaml')

// logger
app.use(morgan('combined', { stream: logger.stream }));

// cors
app.use(cors());

// Body parser
app.use(bodyParser.json());

app.use('/examination', jwtMiddleware, require('./controller/examination/examination.router'));
app.use('/examinationgroup', jwtMiddleware, require('./controller/examinationGroup/examinationGroup.router'));

app.use('/user', require('./controller/user/user.router'));

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

/* eslint no-unused-vars: "off" */
app.use((err, req, res, next) => {
  logger.info(`Error with code ${err.statusCode}, message ${err.message}`);
  res.status(err.statusCode || 500);
  res.json({
    hasError: true,
    message: err.message,
  });
});

module.exports = app;
