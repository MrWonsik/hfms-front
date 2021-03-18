import { getAllUsersCall } from './users.service'

export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
const getUsersRequest = () => ({ type: GET_USERS_REQUEST })

export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
const getUsersSuccess = (users) => ({ type: GET_USERS_SUCCESS, payload: { users } })

export const GET_USERS_FAILURE = "GET_USERS_FAILURE";
const getUsersFailure = () => ({ type: GET_USERS_FAILURE })

export const GET_USERS_CLEAR = "GET_USERS_CLEAR";
export const getUsersClear = () => ({ type: GET_USERS_CLEAR})

export const getAllUsers = (token) => async dispatch => {
    dispatch(getUsersRequest());
    let isUsersLoaded = false;
    await getAllUsersCall(token)
        .then(
            users => {
                dispatch(getUsersSuccess(users.users));
                isUsersLoaded = true;
            },
            error => {
                dispatch(getUsersFailure());
                dispatch(alertError(error));
            }
        );
    return Promise.resolve(isUsersLoaded);
}