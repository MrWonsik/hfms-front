import {
	GET_SHOPS_REQUEST,
	GET_SHOPS_SUCCESS,
	GET_SHOPS_FAILURE,
	CLEAR_EXPENSES,
	CREATE_SHOP_FAILURE,
	CREATE_SHOP_SUCCESS,
	CREATE_SHOP_REQUEST,
	GET_EXPENSE_CATEGORIES_FAILURE,
	GET_EXPENSE_CATEGORIES_SUCCESS,
	GET_EXPENSE_CATEGORIES_REQUEST,
	CREATE_EXPENSE_CATEGORY_FAILURE,
	CREATE_EXPENSE_CATEGORY_REQUEST,
	CREATE_EXPENSE_CATEGORY_SUCCESS
} from "./finance.actions";

const initialState = {
	shops: [],
	expenseCategories: [],
	isShopsLoading: false,
	isExpenseCategoriesLoading: false,
	creatingShopInProgress: false
};

export const finance = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_SHOPS_REQUEST:
			return {
				...state,
				isShopsLoading: true,
			};
		case GET_SHOPS_SUCCESS:
			const { shops } = payload;
			return {
				...state,
				shops: shops?.shops,
				isShopsLoading: false,
			};
		case GET_SHOPS_FAILURE:
			return {
				...state,
				isShopsLoading: false,
			};
		case CLEAR_EXPENSES:
			return {};
		case CREATE_SHOP_REQUEST:
			return {
				...state,
				creatingShopInProgress: true,
			};
		case CREATE_SHOP_SUCCESS:
			const { shop } = payload;
			state.shops.push(shop);
			return {
				...state,
				creatingShopInProgress: false
			};
		case CREATE_SHOP_FAILURE:
			return {
				...state,
				creatingShopInProgress: false
			};
		case GET_EXPENSE_CATEGORIES_REQUEST:
			return {
				...state,
				isExpenseCategoriesLoading: true,
			};
		case GET_EXPENSE_CATEGORIES_SUCCESS:
			const { expenseCategories } = payload;
			return {
				...state,
				expenseCategories: expenseCategories?.expenseCategories,
				isExpenseCategoriesLoading: false,
			};
		case GET_EXPENSE_CATEGORIES_FAILURE:
			return {
				...state,
				isExpenseCategoriesLoading: false,
			};
		case CREATE_EXPENSE_CATEGORY_REQUEST:
			return {
				...state,
				creatingExpenseCategoryInProgress: true,
			};
		case CREATE_EXPENSE_CATEGORY_SUCCESS:
			const { expesneCategory } = payload;
			state.expenseCategories.push(expesneCategory);
			return {
				...state,
				creatingExpenseCategoryInProgress: false
			};
		case CREATE_EXPENSE_CATEGORY_FAILURE:
			return {
				...state,
				creatingExpenseCategoryInProgress: false
			};
		default:
			return state;
	}
};
