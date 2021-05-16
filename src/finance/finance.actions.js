import { alertError, alertSuccess } from "../alert/alert.actions";
import { EXPENSE, INCOME } from "./CategoryType";
import { getShopsCall, createShopCall, deleteShopCall, getCategoriesCall, createCategoryCall, changeStateFavouriteCategoryCall, deleteCategoryCall, editExpenseCategoryMaximumAmountCall, editCategoryCall, createTransactionCall, getTransactionsCall, deleteTransactionCall, getExpenseFileCall, deleteExpenseFileCall, uploadExpenseFileCall, updateTransactionCall } from "./finance.service";
import { EXPENSE_TRANSACTION, INCOME_TRANSACTION } from "./TransactionType";

export const GET_SHOPS_REQUEST = "GET_SHOPS_REQUEST";
export const GET_SHOPS_SUCCESS = "GET_SHOPS_SUCCESS";
export const GET_SHOPS_FAILURE = "GET_SHOPS_FAILURE";
export const getShopsRequest = () => ({ type: GET_SHOPS_REQUEST })
export const getShopsSuccess = (shops) => ({ type: GET_SHOPS_SUCCESS, payload: {shops} })
export const getShopsFailure = () => ({ type: GET_SHOPS_FAILURE })

export const getShops = () => async dispatch => {
    dispatch(getShopsRequest());
    await getShopsCall()
        .then(
            shops => {
                dispatch(getShopsSuccess(shops));
            },
            error => {
                dispatch(getShopsFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}

export const CLEAR_FINANCES = "CLEAR_FINANCES";
export const clearFinances = () => ({ type: CLEAR_FINANCES });

export const CREATE_SHOP_REQUEST = "CREATE_SHOP_REQUEST";
export const CREATE_SHOP_SUCCESS = "CREATE_SHOP_SUCCESS";
export const CREATE_SHOP_FAILURE = "CREATE_SHOP_FAILURE";
export const createShopRequest = () => ({ type: CREATE_SHOP_REQUEST })
export const createShopSuccess = (shop) => ({ type: CREATE_SHOP_SUCCESS, payload: {shop} })
export const createShopFailure = () => ({ type: CREATE_SHOP_FAILURE })

export const createShop = (name) => async dispatch => {
    dispatch(createShopRequest());
    let isShopCreated = false;
    await createShopCall(name)
        .then(
            shop => {
                dispatch(createShopSuccess(shop));
                dispatch(alertSuccess("Shop: " + shop.name + " has been created."));
                isShopCreated = true;
            },
            error => {
                dispatch(createShopFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
    return Promise.resolve(isShopCreated);
}

export const SHOP_DELETE_REQUEST = "SHOP_DELETE_REQUEST";
export const SHOP_DELETE_SUCCESS = "SHOP_DELETE_SUCCESS";
export const SHOP_DELETE_FAILURE = "SHOP_DELETE_FAILURE";
const shopDeleteRequest = (id) => ({ type: SHOP_DELETE_REQUEST, payload: { id } })
const shopDeleteSuccess = () => ({ type: SHOP_DELETE_SUCCESS })
const shopDeleteFailure = () => ({ type: SHOP_DELETE_FAILURE })
export const deleteShop = (id) => async dispatch => {
    dispatch(shopDeleteRequest(id));
    await deleteShopCall(id)
        .then(
            shop => {
                dispatch(shopDeleteSuccess(shop.id));
                dispatch(getShops());
                dispatch(alertSuccess("Shop: " + shop.name + " has been deleted."))
            },
            error => {
                dispatch(shopDeleteFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        )
}

export const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAILURE = "GET_CATEGORIES_FAILURE";
export const getCategoriesRequest = ( categoryType ) => ({ type: GET_CATEGORIES_REQUEST, payload: {categoryType} })
export const getCategoriesSuccess = (categories, categoryType) => ({ type: GET_CATEGORIES_SUCCESS, payload: {categories, categoryType} })
export const getCategoriesFailure = ( categoryType ) => ({ type: GET_CATEGORIES_FAILURE, payload: {categoryType} })

export const getCategories = ( categoryType ) => async dispatch => {
    dispatch(getCategoriesRequest( categoryType ));
    await getCategoriesCall(categoryType)
        .then(
            categories => {
                dispatch(getCategoriesSuccess(categories, categoryType));
            },
            error => {
                dispatch(getCategoriesFailure( categoryType ));
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}

export const CREATE_CATEGORY_REQUEST = "CREATE_CATEGORY_REQUEST";
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS";
export const CREATE_CATEGORY_FAILURE = "CREATE_CATEGORY_FAILURE";
export const createCategoryRequest = () => ({ type: CREATE_CATEGORY_REQUEST })
export const createCategorySuccess = (category, categoryType) => ({ type: CREATE_CATEGORY_SUCCESS, payload: {category, categoryType} })
export const createCategoryFailure = () => ({ type: CREATE_CATEGORY_FAILURE })

export const createCategory = ( category ) => async dispatch => {
    dispatch(createCategoryRequest());
    let type = category.categoryType;
    let isCategoryCreated = false;
    await createCategoryCall(category)
        .then(
            createdCategory => {
                dispatch(createCategorySuccess(createdCategory, type));
                dispatch(alertSuccess("Category: " + createdCategory.categoryName + " has been created."));
                isCategoryCreated = true;
            },
            error => {
                dispatch(createCategoryFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
    return Promise.resolve(isCategoryCreated);
}

export const IS_FAVOURITE_CATEGORY_REQUEST = "IS_FAVOURITE_CATEGORY_REQUEST";
export const IS_FAVOURITE_CATEGORY_SUCCESS = "IS_FAVOURITE_CATEGORY_SUCCESS";
export const IS_FAVOURITE_CATEGORY_FAILURE = "IS_FAVOURITE_CATEGORY_FAILURE";
export const changeStateFavouriteCategoryRequest = () => ({ type: IS_FAVOURITE_CATEGORY_REQUEST })
export const changeStateFavouriteCategorySuccess = (updatedCategory, categoryType) => ({ type: IS_FAVOURITE_CATEGORY_SUCCESS, payload: {updatedCategory, categoryType} })
export const changeStateFavouriteCategoryFailure = () => ({ type: IS_FAVOURITE_CATEGORY_FAILURE })

export const changeStateFavouriteExepenseCategory = ( category ) => async dispatch => {
    dispatch(changeStateFavouriteCategoryRequest());
    await changeStateFavouriteCategoryCall(category)
        .then(
            updatedCategory => {
                dispatch(changeStateFavouriteCategorySuccess(updatedCategory, category.type));
                let msg = "Category: " + updatedCategory.categoryName + " mark as favourite.";
                if(!updatedCategory.favourite) {
                    msg = "Category: " + updatedCategory.categoryName + " is not favourite anymore."
                }
                dispatch(getCategories(category.type));
                dispatch(alertSuccess(msg));
            },
            error => {
                dispatch(changeStateFavouriteCategoryFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}

export const DELETE_CATEGORY_REQUEST = "DELETE_CATEGORY_REQUEST";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_FAILURE = "DELETE_CATEGORY_FAILURE";
export const deleteCategoryRequest = () => ({ type: DELETE_CATEGORY_REQUEST })
export const deleteCategorySuccess = () => ({ type: DELETE_CATEGORY_SUCCESS })
export const deleteCategoryFailure = () => ({ type: DELETE_CATEGORY_FAILURE })

export const deleteCategory = ( id, categoryType ) => async dispatch => {
    dispatch(deleteCategoryRequest());
    await deleteCategoryCall(id, categoryType)
        .then(
            deletedCategory => {
                dispatch(deleteCategorySuccess());
                dispatch(getCategories(categoryType));
                dispatch(alertSuccess("Category " + deletedCategory.categoryName + " has been deleted."));
            },
            error => {
                dispatch(deleteCategoryFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}

export const EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_REQUEST = "EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_REQUEST";
export const EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_SUCCESS = "EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_SUCCESS";
export const EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_FAILURE = "EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_FAILURE";
export const editExpenseCategoryMaximumAmountRequest = () => ({ type: EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_REQUEST })
export const editExpenseCategoryMaximumAmountSuccess = () => ({ type: EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_SUCCESS })
export const editExpenseCategoryMaximumAmountFailure = () => ({ type: EDIT_EXPENSE_CATEGORY_MAXIMUM_COST_FAILURE })

export const editExpenseCategoryMaximumAmount = ( category, newMaximumAmount, isValidFromNextMonth ) => async dispatch => {
    dispatch(editExpenseCategoryMaximumAmountRequest());
    await editExpenseCategoryMaximumAmountCall(category.id, newMaximumAmount, isValidFromNextMonth )
        .then(
            editedCategoryVersion => {
                dispatch(editExpenseCategoryMaximumAmountSuccess(editedCategoryVersion));
                dispatch(getCategories(EXPENSE));
                dispatch(alertSuccess("Category " + category.categoryName + " maximum amount has been updated."));
            },
            error => {
                dispatch(editExpenseCategoryMaximumAmountFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}

export const EDIT_CATEGORY_REQUEST = "EDIT_CATEGORY_REQUEST";
export const EDIT_CATEGORY_SUCCESS = "EDIT_CATEGORY_SUCCESS";
export const EDIT_CATEGORY_FAILURE = "EDIT_CATEGORY_FAILURE";
export const editCategoryRequest = () => ({ type: EDIT_CATEGORY_REQUEST })
export const editCategorySuccess = () => ({ type: EDIT_CATEGORY_SUCCESS })
export const editCategoryFailure = () => ({ type: EDIT_CATEGORY_FAILURE })

export const editCategory = (categoryEdited) => async dispatch => {
    dispatch(editCategoryRequest());
    let isCategoryUpdated = false;
    await editCategoryCall(categoryEdited.categoryId, categoryEdited.categoryName, categoryEdited.colorHex, categoryEdited.categoryType)
        .then(
            editedCategory => {
                dispatch(editCategorySuccess(editedCategory));
                dispatch(getCategories(categoryEdited.categoryType));
                dispatch(alertSuccess("Category " + editedCategory.categoryName + " has been updated."));
                isCategoryUpdated = true;
            },
            error => {
                dispatch(editCategoryFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
    return Promise.resolve(isCategoryUpdated);
}

export const GET_TRANSACTIONS_REQUEST = "GET_TRANSACTIONS_REQUEST";
export const GET_TRANSACTIONS_SUCCESS = "GET_TRANSACTIONS_SUCCESS";
export const GET_TRANSACTIONS_FAILURE = "GET_TRANSACTIONS_FAILURE";
export const getTransactionsRequest = ( transactionType ) => ({ type: GET_TRANSACTIONS_REQUEST, payload: {transactionType} })
export const getTransactionsSuccess = (transactions, transactionType) => ({ type: GET_TRANSACTIONS_SUCCESS, payload: {transactions, transactionType} })
export const getTransactionsFailure = ( transactionType ) => ({ type: GET_TRANSACTIONS_FAILURE, payload: {transactionType} })

export const getTransactions = ( transactionType, date ) => async dispatch => {
    dispatch(getTransactionsRequest( transactionType ));
    await getTransactionsCall(transactionType, date)
        .then(
            transactions => {
                dispatch(getTransactionsSuccess(transactions, transactionType));
            },
            error => {
                dispatch(getTransactionsFailure( transactionType ));
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}

export const GET_ALL_TRANSACTIONS_REQUEST = "GET_ALL_TRANSACTIONS_REQUEST";
export const GET_ALL_TRANSACTIONS_SUCCESS = "GET_ALL_TRANSACTIONS_SUCCESS";
export const getAllTransactionsRequest = () => ({ type: GET_ALL_TRANSACTIONS_REQUEST })
export const getAllTransactionsSuccess = () => ({ type: GET_ALL_TRANSACTIONS_SUCCESS })
export const getAllTransactions = ( date ) => async dispatch => {
    dispatch(getAllTransactionsRequest());
    await Promise.all([
        dispatch(getTransactions(EXPENSE_TRANSACTION, date )),
        dispatch(getTransactions(INCOME_TRANSACTION, date ))
    ]);

    dispatch(getAllTransactionsSuccess())
}


export const CREATE_TRANSACTION_REQUEST = "CREATE_TRANSACTION_REQUEST";
export const CREATE_TRANSACTION_SUCCESS = "CREATE_TRANSACTION_SUCCESS";
export const CREATE_TRANSACTION_FAILURE = "CREATE_TRANSACTION_FAILURE";
export const createTransactionRequest = () => ({ type: CREATE_TRANSACTION_REQUEST })
export const createTransactionSuccess = (transaction, transactionType) => ({ type: CREATE_TRANSACTION_SUCCESS, payload: { transaction, transactionType } })
export const createTransactionFailure = () => ({ type: CREATE_TRANSACTION_FAILURE })

export const createTransaction = ( transaction ) => async dispatch => {
    dispatch(createTransactionRequest());
    let type = transaction.transactionType;
    let isTransactionCreated = false;
    await createTransactionCall(transaction)
        .then(
            createdTransaction => {
                dispatch(createTransactionSuccess(createdTransaction, type));
                // dispatch(getTransactions(type));
                dispatch(alertSuccess("Transaction: " + createdTransaction.name + " has been created."));
                isTransactionCreated = true;
            },
            error => {
                dispatch(createTransactionFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
    return Promise.resolve(isTransactionCreated);
}

export const UPDATE_TRANSACTION_REQUEST = "UPDATE_TRANSACTION_REQUEST";
export const UPDATE_TRANSACTION_SUCCESS = "UPDATE_TRANSACTION_SUCCESS";
export const UPDATE_TRANSACTION_FAILURE = "UPDATE_TRANSACTION_FAILURE";
export const updateTransactionRequest = () => ({ type: UPDATE_TRANSACTION_REQUEST })
export const updateTransactionSuccess = (transaction, type) => ({ type: UPDATE_TRANSACTION_SUCCESS, payload: { transaction, type } })
export const updateTransactionFailure = () => ({ type: UPDATE_TRANSACTION_FAILURE })

export const updateTransaction = ( transaction ) => async dispatch => {
    dispatch(updateTransactionRequest());
    let type = transaction.transactionType;
    let isTransactionUpdated = false;
    await updateTransactionCall(transaction)
        .then(
            updatedTransaction => {
                dispatch(updateTransactionSuccess(updatedTransaction, type));
                dispatch(getTransactions(type));
                dispatch(alertSuccess("Transaction: " + updatedTransaction.name + " has been updated."));
                isTransactionUpdated = true;
            },
            error => {
                dispatch(updateTransactionFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
    return Promise.resolve(isTransactionUpdated);
}

export const DELETE_TRANSACTION_REQUEST = "DELETE_TRANSACTION_REQUEST";
export const DELETE_TRANSACTION_SUCCESS = "DELETE_TRANSACTION_SUCCESS";
export const DELETE_TRANSACTION_FAILURE = "DELETE_TRANSACTION_FAILURE";
export const deleteTransactionRequest = () => ({ type: DELETE_TRANSACTION_REQUEST })
export const deleteTransactionSuccess = () => ({ type: DELETE_TRANSACTION_SUCCESS })
export const deleteTransactionFailure = () => ({ type: DELETE_TRANSACTION_FAILURE })

export const deleteTransaction = ( transactionId, transactionType ) => async dispatch => {
    dispatch(deleteTransactionRequest());
    await deleteTransactionCall(transactionId, transactionType)
        .then(
            deletedTransaction => {
                dispatch(deleteTransactionSuccess(deletedTransaction, transactionType));
                dispatch(getTransactions(transactionType));
                dispatch(alertSuccess("Transaction: " + deletedTransaction.name + " has been deleted."));
            },
            error => {
                dispatch(deleteTransactionFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}

export const GET_EXPENSE_FILE_REQUEST = "GET_EXPENSE_FILE_REQUEST";
export const GET_EXPENSE_FILE_SUCCESS = "GET_EXPENSE_FILE_SUCCESS";
export const GET_EXPENSE_FILE_FAILURE = "GET_EXPENSE_FILE_FAILURE";
export const getExpenseFileRequest = () => ({ type: GET_EXPENSE_FILE_REQUEST })
export const getExpenseFileSuccess = (transactionFile) => ({ type: GET_EXPENSE_FILE_SUCCESS, payload: {transactionFile} })
export const getExpenseFileFailure = () => ({ type: GET_EXPENSE_FILE_FAILURE })

export const getTransactionFile = ( transactionId ) => async dispatch => {
    dispatch(getExpenseFileRequest( ));
    await getExpenseFileCall(transactionId)
        .then(
            transactionFile => {
                dispatch(getExpenseFileSuccess(transactionFile));
            },
            error => {
                console.error(error);
                dispatch(getExpenseFileFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}

export const DELETE_EXPENSE_FILE_REQUEST = "DELETE_EXPENSE_FILE_REQUEST";
export const DELETE_EXPENSE_FILE_SUCCESS = "DELETE_EXPENSE_FILE_SUCCESS";
export const DELETE_EXPENSE_FILE_FAILURE = "DELETE_EXPENSE_FILE_FAILURE";
export const deleteExpenseFileRequest = () => ({ type: DELETE_EXPENSE_FILE_REQUEST })
export const deleteExpenseFileSuccess = (transactionId) => ({ type: DELETE_EXPENSE_FILE_SUCCESS, payload: {transactionId} })
export const deleteExpenseFileFailure = () => ({ type: DELETE_EXPENSE_FILE_FAILURE })

export const deleteTransactionFile = ( transactionId ) => async dispatch => {
    dispatch(deleteExpenseFileRequest());
    await deleteExpenseFileCall(transactionId)
        .then(
            () => {
                dispatch(deleteExpenseFileSuccess(transactionId));
                dispatch(alertSuccess("Transaction file has been deleted."));
            },
            error => {
                console.error(error);
                dispatch(deleteExpenseFileFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}

export const UPLOAD_EXPENSE_FILE_REQUEST = "UPLOAD_EXPENSE_FILE_REQUEST";
export const UPLOAD_EXPENSE_FILE_SUCCESS = "UPLOAD_EXPENSE_FILE_SUCCESS";
export const UPLOAD_EXPENSE_FILE_FAILURE = "UPLOAD_EXPENSE_FILE_FAILURE";
export const uploadExpenseFileRequest = () => ({ type: UPLOAD_EXPENSE_FILE_REQUEST })
export const uploadExpenseFileSuccess = (transactionId, transactionFile) => ({ type: UPLOAD_EXPENSE_FILE_SUCCESS, payload: {transactionId, transactionFile} })
export const uploadExpenseFileFailure = () => ({ type: UPLOAD_EXPENSE_FILE_FAILURE })

export const uploadTransactionFile = ( transactionId, receiptFile ) => async dispatch => {
    dispatch(uploadExpenseFileRequest());
    await uploadExpenseFileCall(transactionId, receiptFile)
        .then(
            transactionFile => {
                dispatch(uploadExpenseFileSuccess(transactionId, transactionFile));
                dispatch(alertSuccess("Transaction file has been uploaded."));
            },
            error => {
                console.error(error);
                dispatch(uploadExpenseFileFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}
