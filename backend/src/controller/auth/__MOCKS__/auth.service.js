const authService = jest.mock('./auth.service');

let mockData;

authService.validateLogin = jest.fn((userName, password) => {
  const user = mockData.find(p => p.userName === userName && p.password === password);
  const response = {
    accessToken: '---',
    refreshToken: '---',
    user
  }
  return Promise.resolve(response);
});

authService.__setMockData = (data) => mockData = data;

module.exports = authService;
