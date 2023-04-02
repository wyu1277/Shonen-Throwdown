import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	player1HP: 15,
	player2HP: 15,
	player1: {},
	player2: {},
	player1Deck: [],
	player2Deck: [],
	winner: null,
	cardInPlay: false,
	counter: 0,
	ended: false
};

const gameSlice = createSlice({
	name: 'game',
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
		setCardToPlay(state, action) {
			state.cardInPlay = action.payload;
		},
		increaseCounter(state, action) {
			state.counter++;
		},
		setCounter(state, action) {
			state.counter = action.payload;
		},
		endGame(state, action) {
			console.log('endgame state change');
			state.ended = action.payload;
		},
		setWinner(state, action) {
			state.winner = action.payload;
		},
		setPlayer1hp(state, action) {
			state.player1HP = action.payload;
		},
		setPlayer2hp(state, action) {
			state.player2HP = action.payload;
		}
	},
	extraReducers: {}
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
