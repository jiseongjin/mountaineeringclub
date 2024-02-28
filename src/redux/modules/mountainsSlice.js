import { createSlice } from '@reduxjs/toolkit';
import mountainData from 'mountainData.json';

const mountainsSlice = createSlice({
  name: 'mountains',
  initialState: mountainData,
  reducers: {
    setMountain: (state, action) => {
      return action.payload;
    },
    addMountain: (state, action) => {
      state.mountains.push(action.payload);
    }
    // updateMountain(state, action) {
    //   const { id, newData } = action.payload;
    //   const index = state.mountains.findIndex((mountain) => mountain.id === id);
    //   if (index !== -1) {
    //     state.mountains[index] = { ...state.mountains[index], ...newData };
    //   }
    // }
  }
});

export const { setMountain, addMountain, updateMountain } = mountainsSlice.actions;
export default mountainsSlice.reducer;
