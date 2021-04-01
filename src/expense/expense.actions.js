import { alertError, alertSuccess } from "../alert/alert.actions";
import { getShopsCall, createShopCall, deleteShopCall } from "./expense.service";

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
                console.log(error);
                dispatch(getShopsFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}

export const CLEAR_EXPENSES = "CLEAR_EXPENSES";
export const clearExpenses = () => ({ type: CLEAR_EXPENSES });

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
                console.log(error);
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