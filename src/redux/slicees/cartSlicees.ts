// rxsli

import { createSlice } from '@reduxjs/toolkit';

type newItemtyps = {
	id: string;
	productName: string;
	imgUrl: string;
	price: number;
	quantity: number;
	totalPrice: number;
};

interface initialStatetyps {
	cartItems: newItemtyps[];
	totalAmount: number;
	totalQuantity: number;
}

const initialState: initialStatetyps = {
	cartItems: [],
	totalAmount: 0,
	totalQuantity: 0,
};

const cartSlicees = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, actions) => {
			const newItem = actions.payload;
			const existingItem = state.cartItems.find(
				(item) => item.id === newItem.id
			);

			state.totalQuantity++;

			if (!existingItem) {
				state.cartItems.push({
					id: newItem.id,
					productName: newItem.productName, // بهینه‌سازی شده
					imgUrl: newItem.image, // بهینه‌سازی شده
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice =
					Number(existingItem.totalPrice) + Number(newItem.price);
			}

			state.totalAmount = state.cartItems.reduce(
				(total, item) => total + Number(item.price) * Number(item.quantity),
				0 // مقدار اولیه
			);

			console.log(state.totalQuantity);
			console.log(state.cartItems);
			console.log(newItem);
		},

		deleteItem: (state, actions) => {
			const id = actions.payload;

			const existingItem = state.cartItems.find((item) => item.id === id);

			if (existingItem) {
				state.cartItems = state.cartItems.filter((item) => item.id !== id)
				state.totalQuantity = state.totalQuantity - existingItem.quantity
			}
			state.totalAmount = state.cartItems.reduce(
				(total, item) => total + Number(item.price) * Number(item.quantity),
				0 // مقدار اولیه
			);
		},
	},
});

export const cartActions = cartSlicees.actions;

export default cartSlicees.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// type newItemtyps = {
// 	id: string;
// 	productName: string;
// 	image: string;
// 	price: number;
// 	quantity: number;
// 	totalPrice: number;
// };

// interface initialStatetyps {
// 	cartItems: newItemtyps[];
// 	totalAmount: number;
// 	totalQuantity: number;
// }

// const initialState: initialStatetyps = {
// 	cartItems: [],
// 	totalAmount: 0,
// 	totalQuantity: 0,
// };

// const cartSlicees = createSlice({
// 	name: 'cart',
// 	initialState,
// 	reducers: {
// 		addItem: (state, actions) => {
// 			const newItem = actions.payload;
// 			const existingItem = state.cartItems.find(
// 				(item) => item.id === newItem.id
// 			);

// 			state.totalQuantity++;

// 			if (!existingItem) {
// 				state.cartItems.push({
// 					id: newItem.id,
// 					productName:newItem.productName,
// 					image: newItem.imgUrl,
// 					price: newItem.price,
// 					quantity: 1,
// 					totalPrice: newItem.price,
// 				});
// 			} else {
// 				existingItem.quantity++;
// 				existingItem.totalPrice =
// 					Number(existingItem.totalPrice) + Number(newItem.price);
// 			}

// 			state.totalAmount = state.cartItems.reduce(
// 				(total, item) => total+  Number(item.price) * Number(item.quantity)
// 			);
// 		},
// 	},
// });

// export const cartActions = cartSlicees.actions;

// export default cartSlicees.reducer;
