import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import { routerReducer } from 'react-router-redux';
export default configureStore({
  reducer: {
    routing: routerReducer,
    auth: authReducer,
  },
  //@ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
