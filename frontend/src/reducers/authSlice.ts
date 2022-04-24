import cookie from 'js-cookie';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authInitialState as authTypes } from '../types/authTypes';

const initialState = {
  user:
    cookie.get('userGE') !== undefined ? JSON.parse(cookie.get('userGE')!) : {},
  isAuthenticated: cookie.get('accessTokenGE') ? true : false,
  accessToken: cookie.get('accessTokenGE') ? cookie.get('accessTokenGE') : '',
} as authTypes;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      cookie.set('userGE', JSON.stringify(action.payload.user));
      cookie.set('isAuthenticatedGE', JSON.stringify(true));
      cookie.set('accessTokenGE', action.payload.accessToken);
    },

    LOGOUT: (state) => {
      state.user = null;
      state.accessToken = '';
      state.isAuthenticated = false;
      cookie.set('userGE', JSON.stringify(null));
      cookie.set('isAuthenticatedGE', JSON.stringify(false));
      cookie.set('accessTokenGE', '');
    },
    UPDATECUST: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      cookie.set('userGE', JSON.stringify(action.payload));
    },
  },
});

export const { LOGIN, LOGOUT, UPDATECUST } = authSlice.actions;
export const selectIsAuthenticated = (state: any) => state.isAuthenticated;
export default authSlice.reducer;
