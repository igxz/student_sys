import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSudentApi, deleteSudentByIdApi } from '../api/stuApi';

// async fetch all students
export const fetchStuListAsync = createAsyncThunk(
  'stu/getStuListAysnc',
  async (_, thunkApi) => {
    // send ajax request
    const response = await getSudentApi();
    // console.log(response.data);
    // dispatch action
    thunkApi.dispatch(initStuList(response.data));
  }
);

// async delete a student by id
export const deleteStuByIdAsync = createAsyncThunk(
    'stu/delStuByIdAysnc',
    async (payload, thunkApi) => {
        // console.log(payload, 'payload >>>')
      //send ajax request
      deleteSudentByIdApi(payload);
      // dispatch action
      thunkApi.dispatch(deleteStu(payload));
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
    deleteStu: (state, {payload})=> {
        for (let i = 0; i < state.stuList.length; i++) {
            if(state.stuList[i].id === payload){
                state.stuList.splice(i,1);
                break;
            }
        }
    },
  },
});

export const { initStuList, deleteStu } = stuSlice.actions;
export default stuSlice.reducer;
