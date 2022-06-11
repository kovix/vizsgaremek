require('dotenv').config();
const config = require('config');
const app = require('./server');
const logger = require('../config/logger');

// Connect to database
if (!config.has('database')) {
  logger.error('Database settings not found');
  process.exit();
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Application is listening on port ${port}`);
});
