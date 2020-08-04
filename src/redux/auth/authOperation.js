/* eslint-disable */
import axios from 'axios';
import * as authActions from './authActions';
import * as API from '../../services/api';

export const setToken = token => {
  axios.defaults.headers.common.Authorization = token;
};

export const unsetToken = () => {
  axios.defaults.headers.Authorization = null;
};

export const register = data => dispatch => {
  dispatch(authActions.startRegister());

  API.registerUser(data)
    .then(res => {
      setToken(res.data.token);
      dispatch(authActions.successRegister(res.data));
    })
    .catch(error => {
      dispatch(authActions.errorRegister(error.response.data.error));
    });
};

export const login = data => dispatch => {
  // console.log('data', data);
  dispatch(authActions.startLogin());

  API.loginUser(data)
    .then(res => {
      setToken(res.data.token);
      dispatch(authActions.successLogin(res.data));
    })
    .catch(error => {
      // dispatch(authActions.errorLogin(error.response.data.error));
      // console.log(error);
    });
};

export const logout = () => dispatch => {
  dispatch(authActions.startLogout());

  API.logoutUser()
    .then(() => {
      unsetToken();
      dispatch(authActions.successLogout());
    })
    .catch(error => dispatch(authActions.errorLogout(error)));
};

export const refresh = () => (dispatch, getState) => {
  const { token } = getState().auth;
  if (!token) {
    return;
  }

  dispatch(authActions.startRefreshUser());

  setToken(token);

  API.refreshUser()
    .then(res => {
      unsetToken();
      dispatch(authActions.successRefreshUser(res.data.user));
      if (res.data.user.photo) {
        dispatch(authActions.setAvatar(res.data.user.photo));
      }
      if (res.data.user.name) {
        dispatch(authActions.setName(res.data.user.name));
      }
    })
    .catch(error => dispatch(authActions.errorRefreshUser(error)));
};
