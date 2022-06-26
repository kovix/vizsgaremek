const express = require('express');
const controller = require('./auth.controller');

const router = express.Router();

router.post('/login', (req, res, next) => controller.validateLogin(req, res, next));
router.post('/refresh', (req, res, next) => controller.refreshToken(req, res, next));
router.post('/logout', (req, res, next) => controller.logout(req, res, next));

module.exports = router;
