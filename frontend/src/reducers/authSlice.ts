import cookie from 'js-cookie';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authInitialState as authTypes } from '../types/authTypes';

const initialState = {
  user:
    cookie.get('userOS') !== undefined ? JSON.parse(cookie.get('userOS')!) : {},
  isAuthenticated: cookie.get('accessTokenOS') ? true : false,
  accessToken: cookie.get('accessTokenDW') ? cookie.get('accessTokenDW') : '',
  refreshToken: cookie.get('refreshTokenDW')
    ? cookie.get('refreshTokenDW')
    : '',
} as authTypes;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOGINCUST: (state, action) => {
      state.user = action.payload.cust;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      cookie.set('custDW', JSON.stringify(action.payload.cust));
      cookie.set('isAuthenticatedDW', JSON.stringify(true));
      cookie.set('accessTokenDW', action.payload.accessToken);
      cookie.set('refreshTokenDW', action.payload.refreshToken);
    },

    LOGOUT: (state) => {
      state.user = null;
      state.accessToken = '';
      state.refreshToken = '';
      state.isAuthenticated = false;
      cookie.set('custDW', JSON.stringify(null));
      cookie.set('therapDW', JSON.stringify(null));
      cookie.set('isAuthenticatedDW', JSON.stringify(false));
      cookie.set('accessTokenDW', '');
      cookie.set('refreshTokenDW', '');
    },
    UPDATECUST: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      cookie.set('custDW', JSON.stringify(action.payload));
    },
  },
});

export const { LOGINCUST, LOGOUT, UPDATECUST } = authSlice.actions;
export const selectIsAuthenticated = (state: any) => state.isAuthenticated;
export default authSlice.reducer;
