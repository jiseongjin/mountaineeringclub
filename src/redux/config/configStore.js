import { configureStore, combineReducers } from '@reduxjs/toolkit';
import mountains from '../modules/mountainsSlice';

const rootReducer = combineReducers({ mountains });

const store = configureStore({
  reducer: rootReducer
});

export default store;
