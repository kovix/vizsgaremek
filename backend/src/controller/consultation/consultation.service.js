const createError = require('http-errors');
const Consultation = require('../../model/consultation.model');
const { createErrorObj } = require('../base/service');

const consultationPopulate = ['doctor', 'groupId', 'examinations.examination', 'details.patient', 'logEntries'];

module.exports = {
  findAll: () => Consultation.find({}).populate(consultationPopulate),

  findById: (id) => Consultation.findById(id).populate(consultationPopulate),

  create: (properties) => {
    const newConsultation = new Consultation(properties);
    return newConsultation.save();
  },

  update: (id, properties) => {
    const filter = { _id: id };
    return Consultation.findOneAndUpdate(filter, properties, { new: true });
  },

  addPatients: async (id, patientsArr) => {
    const result = await Consultation.updateOne(
      { _id: id },
      { $addToSet: { details: patientsArr } },
    );
    const updatedRecord = await Consultation.findById(id).populate(consultationPopulate);
    return updatedRecord;
  },

  updatePatient: async (id, patientId, patientData) => {
    console.log({
      _id: id,
      'details.patient': patientId,
    });
    const result = await Consultation.updateOne({
      _id: id,
      'details.patient': patientId,
    }, {
      $set: {
        'details.$.arrived': patientData.arrived,
        'details.$.leaved': patientData.leaved,
        'details.$.lastUpdated': patientData.lastUpdated,
        'details.$.comment': patientData.comment,
        'details.$.patientConsultations': patientData.examinations,
      },
    });

    if (!result) return createErrorObj(new createError.NotFound('A bejegyzés nem található!'));
    if (!result?.modifiedCount) return createErrorObj(new createError.NotFound('A bejegyzés nem található!'));

    const updatedRecord = Consultation.findById(id).populate(consultationPopulate);
    return updatedRecord;
  },

  remove: async (id, userId) => {
    const record = await Consultation.findById(id);
    if (!record) return false;
    return record.delete(userId);
  },
};
