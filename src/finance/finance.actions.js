import { alertError, alertSuccess } from "../alert/alert.actions";
import { getShopsCall, createShopCall, deleteShopCall, getExpenseCategoriesCall, createExpenseCategoryCall, changeStateFavouriteExepenseCategoryCall, deleteExpenceCategoryCall } from "./finance.service";

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

export const createShop = (shopName) => async dispatch => {
    dispatch(createShopRequest());
    let isShopCreated = false;
    await createShopCall(shopName)
        .then(
            shop => {
                dispatch(createShopSuccess(shop));
                dispatch(alertSuccess("Shop: " + shop.shopName + " has been created."));
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
                dispatch(alertSuccess("Shop: " + shop.shopName + " has been deleted."))
            },
            error => {
                dispatch(shopDeleteFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        )
}

export const GET_EXPENSE_CATEGORIES_REQUEST = "GET_EXPENSE_CATEGORIES_REQUEST";
export const GET_EXPENSE_CATEGORIES_SUCCESS = "GET_EXPENSE_CATEGORIES_SUCCESS";
export const GET_EXPENSE_CATEGORIES_FAILURE = "GET_EXPENSE_CATEGORIES_FAILURE";
export const getExpenseCategoriesRequest = () => ({ type: GET_EXPENSE_CATEGORIES_REQUEST })
export const getExpenseCategoriesSuccess = (expenseCategories) => ({ type: GET_EXPENSE_CATEGORIES_SUCCESS, payload: {expenseCategories} })
export const getExpenseCategoriesFailure = () => ({ type: GET_EXPENSE_CATEGORIES_FAILURE })

export const getExpenseCategories = () => async dispatch => {
    dispatch(getExpenseCategoriesRequest());
    await getExpenseCategoriesCall()
        .then(
            expenseCategories => {
                dispatch(getExpenseCategoriesSuccess(expenseCategories));
            },
            error => {
                dispatch(getExpenseCategoriesFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}

export const CREATE_EXPENSE_CATEGORY_REQUEST = "CREATE_EXPENSE_CATEGORY_REQUEST";
export const CREATE_EXPENSE_CATEGORY_SUCCESS = "CREATE_EXPENSE_CATEGORY_SUCCESS";
export const CREATE_EXPENSE_CATEGORY_FAILURE = "CREATE_EXPENSE_CATEGORY_FAILURE";
export const createExpenseCategoryRequest = () => ({ type: CREATE_EXPENSE_CATEGORY_REQUEST })
export const createExpenseCategorySuccess = (expenseCategory) => ({ type: CREATE_EXPENSE_CATEGORY_SUCCESS, payload: {expenseCategory} })
export const createExpenseCategoryFailure = () => ({ type: CREATE_EXPENSE_CATEGORY_FAILURE })

export const createExpenseCategory = ( category ) => async dispatch => {
    dispatch(createExpenseCategoryRequest());
    let isCategoryCreated = false;
    await createExpenseCategoryCall(category)
        .then(
            category => {
                dispatch(createExpenseCategorySuccess(category));
                dispatch(alertSuccess("Category: " + category.categoryName + " has been created."));
                isCategoryCreated = true;
            },
            error => {
                dispatch(createExpenseCategoryFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
    return Promise.resolve(isCategoryCreated);
}

export const IS_FAVOURITE_EXPENSE_CATEGORY_REQUEST = "IS_FAVOURITE_EXPENSE_CATEGORY_REQUEST";
export const IS_FAVOURITE_EXPENSE_CATEGORY_SUCCESS = "IS_FAVOURITE_EXPENSE_CATEGORY_SUCCESS";
export const IS_FAVOURITE_EXPENSE_CATEGORY_FAILURE = "IS_FAVOURITE_EXPENSE_CATEGORY_FAILURE";
export const changeStateFavouriteExpenseCategoryRequest = () => ({ type: IS_FAVOURITE_EXPENSE_CATEGORY_REQUEST })
export const changeStateFavouriteExpenseCategorySuccess = (updatedExpenseCategory) => ({ type: IS_FAVOURITE_EXPENSE_CATEGORY_SUCCESS, payload: {updatedExpenseCategory} })
export const changeStateFavouriteExpenseCategoryFailure = () => ({ type: IS_FAVOURITE_EXPENSE_CATEGORY_FAILURE })

export const changeStateFavouriteExepenseCategory = ( category ) => async dispatch => {
    dispatch(changeStateFavouriteExpenseCategoryRequest());
    await changeStateFavouriteExepenseCategoryCall(category)
        .then(
            updatedExpenseCategory => {
                dispatch(changeStateFavouriteExpenseCategorySuccess(updatedExpenseCategory));
                let msg = "Category: " + updatedExpenseCategory.categoryName + " mark as favourite.";
                if(!updatedExpenseCategory.favourite) {
                    msg = "Category: " + updatedExpenseCategory.categoryName + " is not favourite anymore."
                }
                dispatch(getExpenseCategories());
                dispatch(alertSuccess(msg));
            },
            error => {
                dispatch(changeStateFavouriteExpenseCategoryFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}

export const DELETE_EXPENSE_CATEGORY_REQUEST = "DELETE_EXPENSE_CATEGORY_REQUEST";
export const DELETE_EXPENSE_CATEGORY_SUCCESS = "DELETE_EXPENSE_CATEGORY_SUCCESS";
export const DELETE_EXPENSE_CATEGORY_FAILURE = "DELETE_EXPENSE_CATEGORY_FAILURE";
export const deleteExpenseCategoryRequest = () => ({ type: DELETE_EXPENSE_CATEGORY_REQUEST })
export const deleteExpenseCategorySuccess = () => ({ type: DELETE_EXPENSE_CATEGORY_SUCCESS })
export const deleteExpenseCategoryFailure = () => ({ type: DELETE_EXPENSE_CATEGORY_FAILURE })

export const deleteExepenseCategory = ( id ) => async dispatch => {
    dispatch(deleteExpenseCategoryRequest());
    await deleteExpenceCategoryCall(id)
        .then(
            deletedExpenseCategory => {
                dispatch(deleteExpenseCategorySuccess());
                dispatch(getExpenseCategories());
                dispatch(alertSuccess("Category " + deletedExpenseCategory.categoryName + " has been deleted."));
            },
            error => {
                dispatch(deleteExpenseCategoryFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}