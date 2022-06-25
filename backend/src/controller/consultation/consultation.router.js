const express = require('express');
const controller = require('./consultation.controller');

const router = express.Router();

router.get('/', (req, res) => controller.findAll(req, res));
router.get('/:id', (req, res, next) => controller.findById(req, res, next));
router.post('/', (req, res, next) => controller.create(req, res, next, true));
router.patch('/:id', (req, res, next) => controller.update(req, res, next));
router.delete('/:id', (req, res, next) => controller.delete(req, res, next));

router.patch('/:id/addpatients', (req, res, next) => controller.addPatients(req, res, next));
router.patch('/:id/updatePatient/:patientid', (req, res, next) => controller.updatePatient(req, res, next));

module.exports = router;
