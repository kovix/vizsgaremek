const examinationService = jest.mock('./examination.service');

let mockData;

const rndString = (len) => Math.random().toString(36).substring(2,len+2);

const jestTestUser = {
    userName: "test",
    password: "test",
    firstName: "test",
    lastName: "test",
    email: "test@test.com",
    role: 1,
}

examinationService.findAll = jest.fn(() => {
  let retData = [...mockData];
  retData = retData.map((item) =>item.createdBy = jestTestUser);
  return Promise.resolve(retData);
})

examinationService.findById = jest.fn((id) => {
  let retData = mockData.find(item => item._id === id);
  if(retData) {
    retData = {...retData};
    retData.createdBy = jestTestUser;
  }
  return Promise.resolve(retData);
})

examinationService.create = jest.fn((properties) => {
  const newData = {...properties};
  newData._id = rndString(8);
  mockData.push(newData);
  return Promise.resolve(newData);
});

examinationService.update = jest.fn((id, properties) => {
  const record = mockData.find(item => item._id === id)
  if(!record) return Promise.resolve(null);

  const updatedRecord = {...record, ...properties};
  return Promise.resolve(updatedRecord);
});

examinationService.remove = jest.fn((id, userId) => {
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

examinationService.__setMockData = (data) => mockData = data;

module.exports = examinationService;
