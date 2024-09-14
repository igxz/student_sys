import { configureStore } from '@reduxjs/toolkit';
import stuReducer from './stuSlice';

const store = configureStore({
  reducer: {
    stu: stuReducer,
  },
});

export default store;
