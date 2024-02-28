import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from '../modules/mountainsSlice';
import mountains from '../modules/mountainsSlice';

const rootReducer = combineReducers({ auth, mountains });

const store = configureStore({
  reducer: rootReducer
});

export default store;
