const express = require('express');
const controller = require('./examinationGroup.controller');

const router = express.Router();

router.get('/', (req, res) => controller.findAll(req, res));
router.get('/:id', (req, res, next) => controller.findById(req, res, next));
router.post('/', (req, res, next) => controller.create(req, res, next));
router.patch('/:id', (req, res, next) => controller.update(req, res, next));
router.patch('/addexaminations/:id', (req, res, next) => controller.addExaminations(req, res, next));
router.patch('/savereorder/:id', (req, res, next) => controller.saveReorder(req, res, next));
router.patch('/removeexaminations/:id/:examid', (req, res, next) => controller.removeExamination(req, res, next));
router.delete('/:id', (req, res, next) => controller.delete(req, res, next));

module.exports = router;
