import { createSlice } from '@reduxjs/toolkit';
import mountainData from 'mountainData.json';

const mountainsSlice = createSlice({
  name: 'mountains',
  initialState: {
    mountainData,
    filteredLevelData: [],
    filteredLocalData: []
  },
  reducers: {
    setMountain: (state, action) => {
      return action.payload;
    },

    filterMountain: (state, action) => {
      const filteredMountain = state.mountainData.filter((mountain) => mountain.난이도.includes(action.payload));
      state.filteredLevelData = filteredMountain;
    },

    localFilterMountain: (state, action) => {
      const localFilterdMountain = state.mountainData.filter((mountain) =>
        mountain.명산_소재지.includes(action.payload)
      );
      state.filteredLocalData = localFilterdMountain;
    }
  }
});

export const { setMountain, filterMountain, localFilterMountain } = mountainsSlice.actions;
export default mountainsSlice.reducer;
