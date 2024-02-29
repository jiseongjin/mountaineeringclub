import { configureStore, combineReducers } from '@reduxjs/toolkit';
import mountains from '../modules/mountainsSlice';
import auth from '../modules/authSlice';

const rootReducer = combineReducers({ auth, mountains });

const store = configureStore({
  reducer: rootReducer
});

export default store;
