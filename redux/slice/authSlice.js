import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  message: null,
  err: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: state => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.err = action.payload;
      state.isAuthenticated = false;
    },
    loadUserRequest: (state, action) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFailure: (state, action) => {
      state.loading = false;
      state.err = action.payload;
      state.isAuthenticated = false;
    },
    clearMessage: (state, action) => {
      state.message = null;
    },
    clearError: (state, action) => {
      state.err = null;
    },
  },
});

export const {
  loginRequest,
  loginFailure,
  loginSuccess,
  clearError,
  clearMessage,
} = authSlice.actions;

export default authSlice.reducer;
