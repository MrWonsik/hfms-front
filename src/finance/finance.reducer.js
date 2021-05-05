import { EXPENSE, INCOME } from '../finance/CategoryType';
import {
	GET_SHOPS_REQUEST,
	GET_SHOPS_SUCCESS,
	GET_SHOPS_FAILURE,
	CLEAR_FINANCES,
	CREATE_SHOP_FAILURE,
	CREATE_SHOP_SUCCESS,
	CREATE_SHOP_REQUEST,
	GET_CATEGORIES_FAILURE,
	GET_CATEGORIES_SUCCESS,
	GET_CATEGORIES_REQUEST,
	CREATE_CATEGORY_FAILURE,
	CREATE_CATEGORY_REQUEST,
	CREATE_CATEGORY_SUCCESS,
	IS_FAVOURITE_CATEGORY_SUCCESS,
	EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_REQUEST,
	EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_SUCCESS,
	EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_FAILURE,
	EDIT_CATEGORY_REQUEST,
	EDIT_CATEGORY_SUCCESS,
	EDIT_CATEGORY_FAILURE,
	CREATE_TRANSACTION_REQUEST,
	CREATE_TRANSACTION_SUCCESS,
	CREATE_TRANSACTION_FAILURE,
	GET_TRANSACTIONS_FAILURE,
	GET_TRANSACTIONS_SUCCESS,
	GET_TRANSACTIONS_REQUEST,
	GET_EXPENSE_FILE_SUCCESS,
	GET_EXPENSE_FILE_FAILURE,
	GET_EXPENSE_FILE_REQUEST
} from "./finance.actions";
import { EXPENSE_TRANSACTION, INCOME_TRANSACTION } from './TransactionType';

const initialState = {
	shops: [],
	expenseCategories: [],
	incomeCategories: [],
	expenseTransactions: [],
	incomeTransactions: [],
	isShopsLoading: false,
	isExpenseCategoriesLoading: false,
	isIncomeCategoriesLoading: false,
	isTransactionsLoading: false,
	creatingCategoryInProgress: false,
	creatingShopInProgress: false,
	isEditExpenseCategoryMaximumCostInProgress: false,
	isEditCategoryInProgress: false,
	expenseFileRequestLoading: false,
	expenseDetailsBytes: ""
};

export const finance = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_SHOPS_REQUEST:
			return {
				...state,
				isShopsLoading: true,
			};
		case GET_SHOPS_SUCCESS: {
			const { shops } = payload;
			return {
				...state,
				shops: shops?.shops,
				isShopsLoading: false,
			};
		}
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
		case CREATE_SHOP_SUCCESS: {
			const { shop } = payload;
			state.shops.push(shop);
			return {
				...state,
				creatingShopInProgress: false
			};
		}
		case CREATE_SHOP_FAILURE:
			return {
				...state,
				creatingShopInProgress: false
			};
		case GET_CATEGORIES_REQUEST: {
			const { categoryType } = payload;
			switch(categoryType) {
				case EXPENSE: {
					return {
						...state,
						isExpenseCategoriesLoading: true
					};
				}
				case INCOME: {
					return {
						...state,
						isIncomeCategoriesLoading: true
					}
				}
				default:
					return state;
			}
		}
		case GET_CATEGORIES_SUCCESS: {
			const { categories, categoryType } = payload;
			switch(categoryType) {
				case EXPENSE: {
					return {
						...state,
						expenseCategories: categories?.categories,
						isExpenseCategoriesLoading: false,
					};
				}
				case INCOME: {
					return {
						...state,
						incomeCategories: categories?.categories,
						isIncomeCategoriesLoading: false
					}
				}
				default:
					return state;
			}
		}
		case GET_CATEGORIES_FAILURE: {
			const { categoryType } = payload;
			switch(categoryType) {
				case EXPENSE: {
					return {
						...state,
						isExpenseCategoriesLoading: false
					};
				}
				case INCOME: {
					return {
						...state,
						isIncomeCategoriesLoading: false
					}
				}
				default:
					return state;
			}
		}
		case CREATE_CATEGORY_REQUEST:
			return {
				...state,
				creatingCategoryInProgress: true,
			};
		case CREATE_CATEGORY_SUCCESS: {
			const { category, categoryType } = payload;
			switch(categoryType) {
				case EXPENSE: {
					state.expenseCategories.push(category);
				} break;
				case INCOME: {
					state.incomeCategories.push(category);
				} break;
			}
			return {
				...state,
				creatingCategoryInProgress: false
			};
		}
		case CREATE_CATEGORY_FAILURE:
			return {
				...state,
				creatingCategoryInProgress: false
			};
		case IS_FAVOURITE_CATEGORY_SUCCESS: {
			const { updatedCategory, categoryType } = payload;
			switch(categoryType) {
				case EXPENSE: {
					return {
						...state,
						expenseCategories: state.expenseCategories.map((expenseCategoryFromState, id) =>
							updatedCategory.id === id ? { ...expenseCategoryFromState, favourite: updatedCategory.favourite } : expenseCategoryFromState
						),
					};
				}
				case INCOME: {
					return {
						...state,
						incomeCategories: state.incomeCategories.map((incomeCategoryFromState, id) =>
							updatedCategory.id === id ? { ...incomeCategoryFromState, favourite: updatedCategory.favourite } : incomeCategoryFromState
						),
					};
				}
				default: 
					return state;
			}
		}
		case EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_REQUEST: 
			return {
				...state,
				isEditExpenseCategoryMaximumCostInProgress: true
			};
		case EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_SUCCESS: 
			return {
				...state,
				isEditExpenseCategoryMaximumCostInProgress: false
			}
		case EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_FAILURE:
			return {
				...state,
				isEditExpenseCategoryMaximumCostInProgress: false
			};
		case EDIT_CATEGORY_REQUEST: 
			return {
				...state,
				isEditCategoryInProgress: true
			};
		case EDIT_CATEGORY_SUCCESS: 
			return {
				...state,
				isEditCategoryInProgress: false
			}
		case EDIT_CATEGORY_FAILURE:
			return {
				...state,
				isEditCategoryInProgress: false
			};
		case GET_TRANSACTIONS_REQUEST: {
			return {
				...state,
				isTransactionsLoading: true
			};
		}
		case GET_TRANSACTIONS_SUCCESS: {
			const { transactions, transactionType } = payload;
			switch(transactionType) {
				case EXPENSE_TRANSACTION: {
					return {
						...state,
						expenseTransactions: transactions.map(transaction => ({...transaction, type: transactionType})),
						isTransactionsLoading: false,
					};
				}
				case INCOME_TRANSACTION: {
					return {
						...state,
						incomeTransactions: transactions.map(transaction => ({...transaction, type: transactionType})),
						isTransactionsLoading: false
					}
				}
				default:
					return state;
			}
		}
		case GET_TRANSACTIONS_FAILURE: 
			return {
				...state,
				isTransactionsLoading: false
			}
		case CREATE_TRANSACTION_REQUEST:
			return {
				...state,
				creatingTransactionInProgress: true,
			};
		case CREATE_TRANSACTION_SUCCESS: {
			const { transaction, transactionType } = payload;
			switch(transactionType) {
				case EXPENSE_TRANSACTION: {
					state.expenseTransactions.push({...transaction, type: transactionType});
				} break;
				case INCOME_TRANSACTION: {
					state.incomeTransactions.push({...transaction, type: transactionType});
				} break;
			}
			return {
				...state,
				creatingTransactionInProgress: false
			};
		}
		case CREATE_TRANSACTION_FAILURE:
			return {
				...state,
				creatingTransactionInProgress: false
			};
		case GET_EXPENSE_FILE_REQUEST:
			return {
				...state,
				expenseFileRequestLoading: true,
			};
		case GET_EXPENSE_FILE_SUCCESS: {
			const { transactionBytes } = payload;
			return {
				...state,
				expenseDetailsBytes: `data:image/jpg;base64, ${transactionBytes}`,
				expenseFileRequestLoading: false
			}
		}
		case GET_EXPENSE_FILE_FAILURE:
			return {
				...state,
				expenseFileRequestLoading: false
			};
		default: return state;
	}
};
