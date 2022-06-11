const express = require('express');
const controller = require('./user.controller');

const router = express.Router();

router.post('/login', (req, res) => controller.validateLogin(req, res));
router.post('/register', (req, res, next) => controller.registerUser(req, res, next));

module.exports = router;
