import { createSlice } from '@reduxjs/toolkit';

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    gamesListLength: 0,
  },
  reducers: {
    setGames(state, action) {
      state.games = action.payload.games;
      state.gamesListLength = action.payload.gamesListLength;
    },
  },
});

export const { setGames } = gamesSlice.actions;
export const gamesReducer = gamesSlice.reducer;
