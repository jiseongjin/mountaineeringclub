import { createSlice } from '@reduxjs/toolkit';
import datas from 'mountainData.json';

const mountainsSlice = createSlice({
  name: 'mountains',
  initialState: datas,
  reducers: {
    setMountain: (state, action) => {
      const setMountain = action.payload;
      return setMountain;
    },
    addMountain: (state, action) => {
      state.mountains.push(action.payload);
    },
    removeMountain(state, action) {
      state.mountains = state.mountains.filter((mountain) => mountain.id !== action.payload.id);
    },
    updateMountain(state, action) {
      const { id, newData } = action.payload;
      const index = state.mountains.findIndex((mountain) => mountain.id === id);
      if (index !== -1) {
        state.mountains[index] = { ...state.mountains[index], ...newData };
      }
    }
  }
});

export const { setMountain, addMountain, removeMountain, updateMountain } = mountainsSlice.actions;
export default mountainsSlice.reducer;
