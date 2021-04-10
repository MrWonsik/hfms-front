import {
	GET_SHOPS_REQUEST,
	GET_SHOPS_SUCCESS,
	GET_SHOPS_FAILURE,
	CLEAR_FINANCES,
	CREATE_SHOP_FAILURE,
	CREATE_SHOP_SUCCESS,
	CREATE_SHOP_REQUEST,
	GET_EXPENSE_CATEGORIES_FAILURE,
	GET_EXPENSE_CATEGORIES_SUCCESS,
	GET_EXPENSE_CATEGORIES_REQUEST,
	CREATE_CATEGORY_FAILURE,
	CREATE_CATEGORY_REQUEST,
	CREATE_CATEGORY_SUCCESS,
	IS_FAVOURITE_CATEGORY_SUCCESS
} from "./finance.actions";

const initialState = {
	shops: [],
	expenseCategories: [],
	incomeCategories: [],
	isShopsLoading: false,
	isExpenseCategoriesLoading: false,
	isIncomeCategoriesLoading: false,
	creatingCategoryInProgress: false,
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
		case CLEAR_FINANCES:
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
		case CREATE_CATEGORY_REQUEST:
			return {
				...state,
				creatingCategoryInProgress: true,
			};
		case CREATE_CATEGORY_SUCCESS:
			const { category } = payload;
			state.expenseCategories.push(category);
			return {
				...state,
				creatingCategoryInProgress: false
			};
		case CREATE_CATEGORY_FAILURE:
			return {
				...state,
				creatingCategoryInProgress: false
			};
		case IS_FAVOURITE_CATEGORY_SUCCESS: {
			const { updatedCategory, categoryType } = payload;
			switch(categoryType) {
				case "Expense category": {
					return {
						...state,
						expenseCategories: state.expenseCategories.map((expenseCategoryFromState, id) =>
							updatedCategory.id === id ? { ...expenseCategoryFromState, favourite: updatedCategory.favourite } : expenseCategoryFromState
						),
					}
				}
				case "Income category": {
					return {
						...state,
						incomeCategories: state.incomeCategories.map((incomeCategoryFromState, id) =>
							updatedCategory.id === id ? { ...incomeCategoryFromState, favourite: updatedCategory.favourite } : incomeCategoryFromState
						),
					}
				}
				default: 
					return state;
			}
		}
		default: return state;
	}
};
