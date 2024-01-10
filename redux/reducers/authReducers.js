import {Dispatch} from 'redux';
import {
  clearError,
  loginFailure,
  loginRequest,
  loginSuccess,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,

} from '../slice/authSlice';
import axios from 'axios';

const api = 'http://192.168.100.3:4000/api/v1';

export const login = (username, password) => async dispatch => {
  try {
    dispatch(loginRequest());
    // Assuming `api` is defined somewhere in your code
    const {data} = await axios.post(`${api}/login`, {username, password});
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

//  load user

export const loadUser = () => async dispatch => {
  // try {
  //   dispatch(loadUserRequest());
  //   // Assuming `api` is defined somewhere in your code
  //   const {data} = await axios.get(`${api}/me`);

  //   console.log('data', data)
  //   dispatch(loadUserSuccess(data));
  // } catch (error) {
  //   dispatch(loadUserFailure(error.response.data.message));
  // }
};
