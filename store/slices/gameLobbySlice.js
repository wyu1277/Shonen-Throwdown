import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	players: []
};

const gameLobbySlice = createSlice({
	name: 'gameLobby',
	initialState,
	reducers: {
		setPlayers(state, action) {
			console.log('redux state being updated with', action.payload);
			state.players = action.payload;
		}
	},
	extraReducers: {}
});

export const gameLobbyActions = gameLobbySlice.actions;

export default gameLobbySlice.reducer;
