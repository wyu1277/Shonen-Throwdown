import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import supabase from '../../lib/supabase';

export const fetchDeckCards = createAsyncThunk('fetchDeckCards', async () => {
	try {
		const deckRow = await supabase.from('decks').select('*').eq('user_id', user.id);
		console.log('Row from deck table', deckRow.data[0].card_ids);
		const cards = await supabase.from('cards').select('*').in('id', deckRow.data[0].card_ids);
		console.log('cards', cards.data);
		return cards.data;
	} catch (error) {
		console.log(error);
	}
});

const initialState = [];

const DeckSlice = createSlice({
	name: 'deck',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchDeckCards.fulfilled, (state, action) => {
			return action.payload;
		});
	}
});

export const selectAllCards = (state) => {
	return state.deck;
};

export default DeckSlice.reducer;
