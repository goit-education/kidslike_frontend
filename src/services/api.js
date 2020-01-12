import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

axios.defaults.baseURL = 'https://kidslike.goit.co.ua/api';

export const setToken = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const registerUser = data => axios.post('/auth/signup', data);

export const postTask = (data, token) =>
  axios.post('/tasks', data, setToken(token));

export const loginUser = data => axios.post('/auth/signin', data);

export const logoutUser = () => axios.get('/auth/logout');

export const refreshUser = () => axios.get('/auth/current');

export const submitPointsButton = (id, data, token) =>
  axios.put(`/users/points/${id}`, data, setToken(token));

export const taskUpdate = (id, task, token) => {
  axios.put(`tasks/${id}`, task, setToken(token));
};
