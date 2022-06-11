const express = require('express');
const controller = require('./examination.controller');

const router = express.Router();

router.get('/', (req, res) => controller.findAll(req, res));

router.get('/:id', (req, res, next) => controller.findById(res, res, next));

module.exports = router;
