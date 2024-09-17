import { configureStore } from '@reduxjs/toolkit';
import cartSlicees from './slicees/cartSlicees';

const store = configureStore({
	reducer: {
		cart: cartSlicees,
	},
});
export default store;


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;