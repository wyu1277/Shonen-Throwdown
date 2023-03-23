import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import toggleReducer from './slices/toggleSlice';
import deckReducer from './slices/deckSlice';

const store = configureStore({
	reducer: { user: userReducer, toggle: toggleReducer, deck: deckReducer }
});

export default store;
