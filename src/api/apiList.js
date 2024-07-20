const BASE_URL = 'http://localhost:3000/api/v1/';

export const apiList = {
  // AUTH APIS - Login , Register
  loginAPI: `${BASE_URL}user/login`,
  register: `${BASE_URL}user/new`,
  me: `${BASE_URL}user/me`,
};
