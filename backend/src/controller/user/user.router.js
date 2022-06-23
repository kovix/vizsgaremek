const express = require('express');
const controller = require('./user.controller');

const router = express.Router();

router.get('/', (req, res) => controller.findAll(req, res));
router.get('/:id', (req, res, next) => controller.findById(req, res, next));

router.post('/login', (req, res, next) => controller.validateLogin(req, res, next));
router.post('/', (req, res, next) => controller.create(req, res, next));
router.post('/patch', (req, res, next) => controller.update(req, res, next));

module.exports = router;
