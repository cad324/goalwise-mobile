import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    accessToken: '',
    refreshToken: ''
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = '';
      state.refreshToken = '';
    },
    login: (state) => {
      state.isAuthenticated = true;
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
    },
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login, setTokens, logout, setAuthStatus } = authSlice.actions;
export default authSlice.reducer;