import AsyncStorage from '@react-native-async-storage/async-storage';
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
      AsyncStorage.removeItem('refreshToken');
      AsyncStorage.removeItem('accessToken');
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      AsyncStorage.setItem('accessToken', action.payload.access);
      AsyncStorage.setItem('refreshToken', action.payload.refresh);
    },
    setUser: (state, action) => {
      state.user = action.payload;
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

export const { login, setTokens, logout, setAuthStatus, setUser } = authSlice.actions;
export default authSlice.reducer;