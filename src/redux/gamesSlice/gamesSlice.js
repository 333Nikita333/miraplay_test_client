import { createSlice } from '@reduxjs/toolkit';

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    gamesListLength: 0,
  },
  reducers: {
    setGames(state, action) {
      state.games.push(...action.payload.games);
      state.gamesListLength = action.payload.gamesListLength;
    },
    clearGames(state) {
      state.games = [];
      state.gamesListLength = 0;
    },
  },
});

export const { setGames, clearGames } = gamesSlice.actions;
export const gamesReducer = gamesSlice.reducer;
