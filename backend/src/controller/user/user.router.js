const express = require('express');
const controller = require('./user.controller');

const router = express.Router();

router.post('/login', (req, res, next) => controller.validateLogin(req, res, next));
router.post('/register', (req, res, next) => controller.registerUser(req, res, next));

module.exports = router;
