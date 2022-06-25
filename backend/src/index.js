require('dotenv').config();
const config = require('config');
const app = require('./server');
const logger = require('../config/logger');
const websockets = require('./controller/websocket/websocket');

// Connect to database
if (!config.has('database')) {
  logger.error('Database settings not found');
  process.exit();
}

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  logger.info(`Application is listening on port ${port}`);
});

websockets(server);
