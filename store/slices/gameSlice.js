import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player1HP: 15,
  player2HP: 15,
  player1: {},
  player2: {},
  player1Deck: [],
  player2Deck: [],
  winnder: null,
  loser: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayer1(state, action) {
      state.player1 = action.payload;
    },
    setPlayer2(state, action) {
      state.player2 = action.payload;
    },
    setPlayer1Deck(state, action) {
      state.player1Deck = action.payload;
    },
    setPlayer2Deck(state, action) {
      state.player2Deck = action.payload;
    },
    decreasePlayer1HP(state, action) {
      state.player1HP -= action.payload;
    },
    decreasePlayer2HP(state, action) {
      state.player2HP -= action.payload;
    },
  },
  extraReducers: {},
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
