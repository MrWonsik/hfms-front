import { getShopsCall } from "./expense.service";

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