const { createErrorObj } = require('../../base/service');
const mongoose = require('mongoose');

const consultationService = jest.mock('./consultation.service');

let mockData;

const rndString = (len) => Math.random().toString(36).substring(2,len+2);


consultationService.findAll = jest.fn(() => {
  let retData = [...mockData];
  return Promise.resolve(retData);
});

consultationService.findById = jest.fn((id) => {
  let retData = mockData.find(item => item._id === id);
  return Promise.resolve(retData);
})

consultationService.create = jest.fn((properties) => {
  const newData = {...properties};
  newData._id = rndString(8);
  mockData.push(newData);
  return Promise.resolve(newData);
});

consultationService.update = jest.fn((id, properties) => {
  const record = mockData.find(item => item._id === id)
  if(!record) return Promise.resolve(null);

  const updatedRecord = {...record, ...properties};
  return Promise.resolve(updatedRecord);
});

/*



examinationGroupService.remove = jest.fn((id, userId) => {
  const record = mockData.find(item => item._id === id)
  if(!record) return Promise.resolve(false);
  
  const addedProperties = {
    deleted: true,
    deletedAt: 'deleted_date_here',
    deletedBy: userId,
  }

  const updatedRecord = {...record, ...addedProperties};
  return Promise.resolve(updatedRecord);
  
}); 


examinationGroupService.addExaminations = jest.fn((id, examinations) => {
  const record = mockData.find(item => item._id === id)
  if (!record) return createErrorObj(new createError.NotFound('Nincs ilyen csoport!'));
  let allValid = true;
  examinations.forEach((newId) => {
    const newObjId = new mongoose.mongo.ObjectId(newId);
    const existingRecord = record.examinations.find((obj) => obj.examination?.equals(newObjId));
    if (existingRecord) allValid = false;
  });
  if (!allValid) return createErrorObj(new createError.BadRequest('A lista tartalmaz olyan vizsgálatot, amely már létezik a vizsgálatban.'));

  const nextOrder = record.examinations
    .map((obj) => obj.order)
    .reduce((prev, current) => {
      if (current > prev) return current;
      return prev;
    }, 0) + 1;
  fullRecord = JSON.parse(JSON.stringify(record));
  fullRecord.examinations = [...record.examinations, ...prepareExaminations(examinations, nextOrder)];
  return Promise.resolve(fullRecord);
});


examinationGroupService.reorderExaminations = jest.fn( (id, examinations) => {
  const dbExaminations = prepareExaminations(examinations, 0);
  
  const record = mockData.find(item => item._id === id)
  if (!record) return Promise.resolve(createErrorObj(new createError.NotFound('A csoport nem található!')));
 
  fullRecord = JSON.parse(JSON.stringify(record));
  fullRecord.examinations = dbExaminations;
  return Promise.resolve(fullRecord);
});

examinationGroupService.removeExamination = jest.fn((id, examinationId) => {
  const record = mockData.find(item => item._id === id)
  if (!record) return Promise.resolve(createErrorObj(new createError.NotFound('A csoport nem található!')));

  const fullRecord = JSON.parse(JSON.stringify(record));
  const newExaminations = fullRecord.examinations.filter((exam) => exam._id !== examinationId);
  fullRecord.examinations = newExaminations;
  return fullRecord;
}); */

consultationService.__setMockData = (data) => mockData = data;

module.exports = consultationService;
