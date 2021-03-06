import { EXPENSE, INCOME } from './CategoryType'
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
  GET_EXPENSE_FILE_REQUEST,
  DELETE_EXPENSE_FILE_REQUEST,
  DELETE_EXPENSE_FILE_SUCCESS,
  DELETE_EXPENSE_FILE_FAILURE,
  UPLOAD_EXPENSE_FILE_REQUEST,
  UPLOAD_EXPENSE_FILE_SUCCESS,
  UPLOAD_EXPENSE_FILE_FAILURE,
  UPDATE_TRANSACTION_REQUEST,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAILURE,
  GET_ALL_TRANSACTIONS_REQUEST,
  GET_ALL_TRANSACTIONS_SUCCESS,
  DELETE_TRANSACTION_SUCCESS,
  SHOP_DELETE_SUCCESS,
  DELETE_CATEGORY_SUCCESS
} from './finance.actions'
import { EXPENSE_TRANSACTION, INCOME_TRANSACTION } from './TransactionType'

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
  creatingTransactionInProgress: false,
  updateTransactionInProgress: false,
  isEditExpenseCategoryMaximumAmountInProgress: false,
  isEditCategoryInProgress: false,
  expenseFileRequestLoading: false,
  expenseDetailsBytes: ''
}

export const finance = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_SHOPS_REQUEST:
      return {
        ...state,
        isShopsLoading: true
      }
    case GET_SHOPS_SUCCESS: {
      const { shops } = payload
      return {
        ...state,
        shops: shops?.shops,
        isShopsLoading: false
      }
    }
    case GET_SHOPS_FAILURE:
      return {
        ...state,
        isShopsLoading: false
      }
    case SHOP_DELETE_SUCCESS: {
      const { shopId } = payload
      return {
        ...state,
        shops: state?.shops.filter((shop) => shopId !== shop.id)
      }
    }
    case CLEAR_FINANCES:
      return {}
    case CREATE_SHOP_REQUEST:
      return {
        ...state,
        creatingShopInProgress: true
      }
    case CREATE_SHOP_SUCCESS: {
      const { shop } = payload
      state.shops.push(shop)
      return {
        ...state,
        creatingShopInProgress: false
      }
    }
    case CREATE_SHOP_FAILURE:
      return {
        ...state,
        creatingShopInProgress: false
      }
    case GET_CATEGORIES_REQUEST: {
      const { categoryType } = payload
      switch (categoryType) {
        case EXPENSE: {
          return {
            ...state,
            isExpenseCategoriesLoading: true
          }
        }
        case INCOME: {
          return {
            ...state,
            isIncomeCategoriesLoading: true
          }
        }
        default:
          return state
      }
    }
    case GET_CATEGORIES_SUCCESS: {
      const { categories, categoryType } = payload
      switch (categoryType) {
        case EXPENSE: {
          return {
            ...state,
            expenseCategories: categories?.categories,
            isExpenseCategoriesLoading: false
          }
        }
        case INCOME: {
          return {
            ...state,
            incomeCategories: categories?.categories,
            isIncomeCategoriesLoading: false
          }
        }
        default:
          return state
      }
    }
    case GET_CATEGORIES_FAILURE: {
      const { categoryType } = payload
      switch (categoryType) {
        case EXPENSE: {
          return {
            ...state,
            isExpenseCategoriesLoading: false
          }
        }
        case INCOME: {
          return {
            ...state,
            isIncomeCategoriesLoading: false
          }
        }
        default:
          return state
      }
    }
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        creatingCategoryInProgress: true
      }
    case CREATE_CATEGORY_SUCCESS: {
      const { category, categoryType } = payload
      switch (categoryType) {
        case EXPENSE:
          state.expenseCategories.push(category)
          break
        case INCOME:
          state.incomeCategories.push(category)
          break
      }
      return {
        ...state,
        creatingCategoryInProgress: false
      }
    }
    case CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        creatingCategoryInProgress: false
      }
    case IS_FAVOURITE_CATEGORY_SUCCESS: {
      const { updatedCategory, categoryType } = payload
      switch (categoryType) {
        case EXPENSE: {
          return {
            ...state,
            expenseCategories: state.expenseCategories.map(
              (expenseCategoryFromState) =>
                updatedCategory.id === expenseCategoryFromState.id
                  ? { ...expenseCategoryFromState, favourite: updatedCategory.favourite }
                  : expenseCategoryFromState
            )
          }
        }
        case INCOME: {
          return {
            ...state,
            incomeCategories: state.incomeCategories.map((incomeCategoryFromState) => {
              return updatedCategory.id === incomeCategoryFromState.id
                ? { ...incomeCategoryFromState, favourite: updatedCategory.favourite }
                : incomeCategoryFromState
            }
            )
          }
        }
        default:
          return state
      }
    }
    case EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_REQUEST:
      return {
        ...state,
        isEditExpenseCategoryMaximumAmountInProgress: true
      }
    case EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_SUCCESS: {
      const { category, editedCategoryVersion, isValidFromNextMonth } = payload
      return {
        ...state,
        expenseCategories: state.expenseCategories.map((expenseCategory) => {
          if (expenseCategory.id === category.id) {
            return isValidFromNextMonth
              ? {
                  ...expenseCategory,
                  expenseCategoryVersions: category.expenseCategoryVersions.map((expenseCategoryVersionState) =>
                    editedCategoryVersion.id === expenseCategoryVersionState.id ? editedCategoryVersion : expenseCategoryVersionState
                  )
                }
              : {
                  ...expenseCategory,
                  currentVersion: editedCategoryVersion,
                  expenseCategoryVersions: category.expenseCategoryVersions.map((expenseCategoryVersionState) =>
                    editedCategoryVersion.id === expenseCategoryVersionState.id ? editedCategoryVersion : expenseCategoryVersionState
                  )
                }
          }

          return expenseCategory
        }),
        isEditExpenseCategoryMaximumAmountInProgress: false
      }
    }
    case EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_FAILURE:
      return {
        ...state,
        isEditExpenseCategoryMaximumAmountInProgress: false
      }
    case EDIT_CATEGORY_REQUEST:
      return {
        ...state,
        isEditCategoryInProgress: true
      }
    case EDIT_CATEGORY_SUCCESS: {
      const { editedCategory, categoryType } = payload
      switch (categoryType) {
        case EXPENSE: {
          return {
            ...state,
            expenseCategories: state.expenseCategories.map((expenseCategoryFromState) =>
              editedCategory.id === expenseCategoryFromState.id
                ? editedCategory
                : expenseCategoryFromState
            ),
            isEditCategoryInProgress: false
          }
        }
        case INCOME: {
          return {
            ...state,
            incomeCategories: state.incomeCategories.map((incomeCategoryFromState) =>
              editedCategory.id === incomeCategoryFromState.id
                ? editedCategory
                : incomeCategoryFromState
            ),
            isEditCategoryInProgress: false
          }
        }
        default:
          return {
            ...state,
            isEditCategoryInProgress: false
          }
      }
    }
    case EDIT_CATEGORY_FAILURE:
      return {
        ...state,
        isEditCategoryInProgress: false
      }
    case DELETE_CATEGORY_SUCCESS: {
      const { id, categoryType } = payload
      switch (categoryType) {
        case EXPENSE: {
          return {
            ...state,
            expenseCategories: state.expenseCategories.filter((expenseCategoryFromState) => id !== expenseCategoryFromState.id)
          }
        }
        case INCOME: {
          return {
            ...state,
            incomeCategories: state.incomeCategories.filter((incomeCategoryFromState) => id !== incomeCategoryFromState.id)
          }
        }
        default:
          return { ...state }
      }
    }
    case GET_TRANSACTIONS_REQUEST: {
      return state
    }
    case GET_TRANSACTIONS_SUCCESS: {
      const { transactions, transactionType } = payload
      switch (transactionType) {
        case EXPENSE_TRANSACTION: {
          return {
            ...state,
            expenseTransactions: transactions.map(transaction => ({ ...transaction, type: transactionType }))
          }
        }
        case INCOME_TRANSACTION: {
          return {
            ...state,
            incomeTransactions: transactions.map(transaction => ({ ...transaction, type: transactionType }))
          }
        }
        default:
          return state
      }
    }
    case GET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isTransactionsLoading: false
      }
    case GET_ALL_TRANSACTIONS_REQUEST: {
      return {
        ...state,
        isTransactionsLoading: true
      }
    }
    case GET_ALL_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        isTransactionsLoading: false
      }
    }
    case CREATE_TRANSACTION_REQUEST:
      return {
        ...state,
        creatingTransactionInProgress: true
      }
    case CREATE_TRANSACTION_SUCCESS: {
      const { transaction, transactionType } = payload
      switch (transactionType) {
        case EXPENSE_TRANSACTION:
          state.expenseTransactions.push({ ...transaction, type: transactionType })
          break
        case INCOME_TRANSACTION:
          state.incomeTransactions.push({ ...transaction, type: transactionType })
          break
      }
      return {
        ...state,
        creatingTransactionInProgress: false
      }
    }
    case CREATE_TRANSACTION_FAILURE:
      return {
        ...state,
        creatingTransactionInProgress: false
      }

    case UPDATE_TRANSACTION_REQUEST:
      return {
        ...state,
        updateTransactionInProgress: true
      }
    case UPDATE_TRANSACTION_SUCCESS: {
      const { transaction, type } = payload
      transaction.type = type
      switch (type) {
        case EXPENSE_TRANSACTION: {
          return {
            ...state,
            expenseTransactions: state.expenseTransactions.map((expenseTransactionsState) =>
              transaction.id === expenseTransactionsState.id ? transaction : expenseTransactionsState
            ),
            updateTransactionInProgress: false
          }
        }
        case INCOME_TRANSACTION: {
          return {
            ...state,
            incomeTransactions: state.incomeTransactions.map((incomeTransactionsState) =>
              transaction.id === incomeTransactionsState.id ? transaction : incomeTransactionsState
            ),
            updateTransactionInProgress: false
          }
        }
        default: return { ...state, updateTransactionInProgress: false }
      }
    }
    case UPDATE_TRANSACTION_FAILURE:
      return {
        ...state,
        updateTransactionInProgress: false
      }
    case DELETE_TRANSACTION_SUCCESS: {
      const { transactionId, transactionType } = payload
      switch (transactionType) {
        case EXPENSE_TRANSACTION: {
          return {
            ...state,
            expenseTransactions: state?.expenseTransactions.filter((expenseTransactionsState) => transactionId !== expenseTransactionsState.id)
          }
        }
        case INCOME_TRANSACTION: {
          return {
            ...state,
            incomeTransactions: state?.incomeTransactions.filter((incomeTransactionsState) => transactionId !== incomeTransactionsState.id)
          }
        }
        default: return { ...state, updateTransactionInProgress: false }
      }
    }
    case GET_EXPENSE_FILE_REQUEST:
      return {
        ...state,
        expenseFileRequestLoading: true
      }
    case GET_EXPENSE_FILE_SUCCESS: {
      const { transactionFile } = payload
      return {
        ...state,
        expenseDetailsBytes: `data:image/jpg;base64, ${transactionFile.base64Resource}`,
        expenseFileRequestLoading: false
      }
    }
    case GET_EXPENSE_FILE_FAILURE:
      return {
        ...state,
        expenseFileRequestLoading: false
      }
    case DELETE_EXPENSE_FILE_REQUEST:
      return {
        ...state,
        expenseFileRequestLoading: true
      }
    case DELETE_EXPENSE_FILE_SUCCESS: {
      const { transactionId } = payload
      return {
        ...state,
        expenseTransactions: state.expenseTransactions.map((expenseTransactionsState) =>
          transactionId === expenseTransactionsState.id ? { ...expenseTransactionsState, receiptId: null } : expenseTransactionsState
        ),
        expenseDetailsBytes: null,
        expenseFileRequestLoading: false
      }
    }
    case DELETE_EXPENSE_FILE_FAILURE:
      return {
        ...state,
        expenseFileRequestLoading: false
      }
    case UPLOAD_EXPENSE_FILE_REQUEST:
      return {
        ...state,
        expenseFileRequestLoading: true
      }
    case UPLOAD_EXPENSE_FILE_SUCCESS: {
      const { transactionId, transactionFile } = payload
      return {
        ...state,
        expenseTransactions: state.expenseTransactions.map((expenseTransactionsState) =>
          transactionId === expenseTransactionsState.id ? { ...expenseTransactionsState, receiptId: transactionFile.id } : expenseTransactionsState
        ),
        expenseDetailsBytes: `data:image/jpg;base64, ${transactionFile.base64Resource}`,
        expenseFileRequestLoading: false
      }
    }
    case UPLOAD_EXPENSE_FILE_FAILURE:
      return {
        ...state,
        expenseFileRequestLoading: false
      }
    default: return state
  }
}
