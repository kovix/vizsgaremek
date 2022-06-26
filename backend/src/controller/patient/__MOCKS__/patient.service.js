const patientService = jest.mock('./patient.service');

let mockData;

const rndString = (len) => Math.random().toString(36).substring(2,len+2);

const jestTestUser = {
  userName: 'test',
  password: 'test',
  firstName: 'test',
  lastName: 'test',
  email: 'test0@test.com',
  role: 1,
}

patientService.findAll = jest.fn(() => {
  let retData = [...mockData];
  retData = retData.map((item) =>item.createdBy = jestTestUser);
  return Promise.resolve(retData);
})

patientService.findById = jest.fn((id) => {
  let retData = mockData.find(item => item._id === id);
  if(retData) {
    retData = {...retData};
    retData.createdBy = jestTestUser;
  }
  return Promise.resolve(retData);
})

patientService.create = jest.fn((properties) => {
  const newData = {...properties};
  newData._id = rndString(8);
  mockData.push(newData);
  return Promise.resolve(newData);
});

patientService.update = jest.fn((id, properties) => {
  const record = mockData.find(item => item._id === id)
  if(!record) return Promise.resolve(null);

  const updatedRecord = {...record, ...properties};
  updatedRecord.createdBy = jestTestUser; //populate
  return Promise.resolve(updatedRecord);
});


patientService.remove = jest.fn((id, userId) => {
  const record = mockData.find(item => item._id === id)
  if(!record) return Promise.resolve(false);
  
  const addedProperties = {
    deleted: true,
    deletedAt: 'deleted_date_here',
    deletedBy: userId,
  }

  const updatedRecord = {...record, ...addedProperties};
  delete updatedRecord.createdBy;
  return Promise.resolve(updatedRecord);
  
});

patientService.__setMockData = (data) => mockData = data;

module.exports = patientService;
