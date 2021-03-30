import {
	GET_SHOPS_REQUEST,
	GET_SHOPS_SUCCESS,
	GET_SHOPS_FAILURE,
	CLEAR_EXPENSES,
} from "./expense.actions";

const initialState = {
	shops: []
};

export const expenses = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_SHOPS_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case GET_SHOPS_SUCCESS:
			const { shops } = payload;
			return {
				shops: shops.shops,
				isLoading: false,
			};
		case GET_SHOPS_FAILURE:
			return {
				...state,
				isLoading: false,
			};
		case CLEAR_EXPENSES:
			return {};
		default:
			return state;
	}
};
