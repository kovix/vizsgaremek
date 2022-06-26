const userService = jest.mock('./user.service');

let mockData;

const rndString = (len) => Math.random().toString(36).substring(2,len+2);

userService.findAll = jest.fn(() => {
  let retData = JSON.parse(JSON.stringify(mockData)); //deep!!!
  return Promise.resolve(retData);
});

userService.findById = jest.fn((id) => {
  let retData = mockData.find(item => item._id === id);
  if(retData) {
    retData = {...retData};
  }
  return Promise.resolve(retData);
})

userService.registerUser = jest.fn((properties) => {
  const newData = {...properties};
  newData._id = rndString(8);
  mockData.push(newData);
  return Promise.resolve(newData);
});

userService.update = jest.fn((id, properties) => {
  let record = mockData.find(item => item._id === id);
  if(!record) return Promise.resolve(null);
  record = JSON.parse(JSON.stringify(record));
  const updatedRecord = {...record, ...properties};
  return Promise.resolve(updatedRecord);
});

userService.remove = jest.fn((id, userId) => {
  const record = mockData.find(item => item._id === id)
  if(!record) return Promise.resolve(false);
  
  const addedProperties = {
    userName: `törölt_${new Date().getTime()}`,
    firstName: 'Törölt',
    lastName: 'Törölt',
    email: `do_not_send_${new Date().getTime()}@setalo.lap`,
    role: 0,
    password: 'deleted_pass',
    confirmPassword: 'deleted_pass',
    deleted: true,
    deletedAt: 'deleted_date_here',
    deletedBy: userId,
  }

  const updatedRecord = {...record, ...addedProperties};
  return Promise.resolve(updatedRecord);
  
}); 

userService.__setMockData = (data) => mockData = data;

module.exports = userService;
