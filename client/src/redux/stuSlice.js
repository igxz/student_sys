import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSudentApi,
  deleteSudentByIdApi,
  editSudentByIdApi,
} from '../api/stuApi';

// async fetch all students
export const fetchStuListAsync = createAsyncThunk(
  'stu/getStuListAysnc',
  async (_, thunkApi) => {
    // send ajax request
    const response = await getSudentApi();
    // dispatch action
    thunkApi.dispatch(initStuList(response.data));
  }
);

// async delete a student by id
export const deleteStuByIdAsync = createAsyncThunk(
  'stu/delStuByIdAysnc',
  async (payload, thunkApi) => {
    //send ajax request
    deleteSudentByIdApi(payload);
    // dispatch action
    thunkApi.dispatch(deleteStu(payload));
  }
);

// async edit a student by id
export const editStuByIdAsync = createAsyncThunk(
  'stu/editStuByIdAysnc',
  async (payload, thunkApi) => {
    console.log(payload, '<<< payload');
    //send ajax request
    editSudentByIdApi(payload.id, payload.stu);
    // dispatch action
    thunkApi.dispatch(editStu(payload));
  }
);

const initialState = {
  stuList: [],
};

const stuSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    // initial student list data to the store
    initStuList: (state, { payload }) => {
      state.stuList = payload;
    },
    // delete a student by id
    deleteStu: (state, { payload }) => {
      for (let i = 0; i < state.stuList.length; i++) {
        if (state.stuList[i].id === payload) {
          state.stuList.splice(i, 1);
          break;
        }
      }
    },
    // edit a student by id
    editStu: (state, { payload }) => {
      for (let i = 0; i < state.stuList.length; i++) {
        if (state.stuList[i].id === payload.id) {
          state.stuList.splice(i, 1, payload.stu);
          break;
        }
      }
    },
  },
});

export const { initStuList, deleteStu, editStu } = stuSlice.actions;
export default stuSlice.reducer;
