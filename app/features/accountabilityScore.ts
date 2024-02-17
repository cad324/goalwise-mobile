import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'accountability_score',
  initialState: {
    score: 0
  },
  reducers: {
    setScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const { setScore } = authSlice.actions;
export default authSlice.reducer;