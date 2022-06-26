const createError = require('http-errors');
const Consultation = require('../../model/consultation.model');
const { createErrorObj } = require('../base/service');


module.exports = {
  findAll: () => Consultation.find({})
    .populate({ path: 'doctor', options: { withDeleted: true } })
    .populate({ path: 'groupId', options: { withDeleted: true } })
    .populate({path: 'examinations.examination', options: { withDeleted: true } } )
    .populate({path: 'details.patient', options: { withDeleted: true } } )
    .populate({path: 'logEntries' } ),

  findById: (id) => Consultation.findById(id)
    .populate({ path: 'doctor', options: { withDeleted: true } })
    .populate({ path: 'groupId', options: { withDeleted: true } })
    .populate({path: 'examinations.examination', options: { withDeleted: true } } )
    .populate({path: 'details.patient', options: { withDeleted: true } } )
    .populate({path: 'logEntries' } ),

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

    if (!result) return createErrorObj(new createError.NotFound('A bejegyzés nem található!'));
    if (!result?.modifiedCount) return createErrorObj(new createError.NotFound('A bejegyzés nem található!'));

    const updatedRecord = await Consultation.findById(id)
      .populate({ path: 'doctor', options: { withDeleted: true } })
      .populate({ path: 'groupId', options: { withDeleted: true } })
      .populate({path: 'examinations.examination', options: { withDeleted: true } } )
      .populate({path: 'details.patient', options: { withDeleted: true } } )
      .populate({path: 'logEntries' } );
    return updatedRecord;
  },

  updatePatient: async (id, patientId, patientData) => {
    const result = await Consultation.updateOne({
      _id: id,
      'details.patient': patientId,
    }, {
      $set: {
        'details.$.arrived': patientData.arrived,
        'details.$.leaved': patientData.leaved,
        'details.$.lastUpdated': patientData.lastUpdated,
        'details.$.comment': patientData.comment,
        'details.$.alert': patientData.alert,
        'details.$.patientConsultations': patientData.examinations,
      },
    });

    if (!result) return createErrorObj(new createError.NotFound('A bejegyzés nem található!'));
    if (!result?.modifiedCount) return createErrorObj(new createError.NotFound('A bejegyzés nem található!'));

    const updatedRecord = Consultation.findById(id)
      .populate({ path: 'doctor', options: { withDeleted: true } })
      .populate({ path: 'groupId', options: { withDeleted: true } })
      .populate({path: 'examinations.examination', options: { withDeleted: true } } )
      .populate({path: 'details.patient', options: { withDeleted: true } } )
      .populate({path: 'logEntries' } );
    return updatedRecord;
  },

  remove: async (id, userId) => {
    const record = await Consultation.findById(id);
    if (!record) return false;
    return record.delete(userId);
  },
};
