import { getAllUsersCall, editUserStatusCall } from './users.service'
import { alertError } from '../../alert/alert.actions'

export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";
const getUsersRequest = () => ({ type: GET_USERS_REQUEST })
const getUsersSuccess = (users) => ({ type: GET_USERS_SUCCESS, payload: { users } })
const getUsersFailure = () => ({ type: GET_USERS_FAILURE })

export const GET_USERS_CLEAR = "GET_USERS_CLEAR";
export const getUsersClear = () => ({ type: GET_USERS_CLEAR})

export const USER_CHANGE_STATUS_REQUEST = "USER_CHANGE_STATUS_REQUEST";
export const USER_CHANGE_STATUS_SUCCESS = "USER_CHANGE_STATUS_SUCCESS";
export const USER_CHANGE_STATUS_FAILURE = "USER_CHANGE_STATUS_FAILURE";
const userChangeStatusRequest = () => ({ type: USER_CHANGE_STATUS_REQUEST })
const userChangeStatusSuccess = (id, isEnabled) => ({ type: USER_CHANGE_STATUS_SUCCESS, payload: { id, isEnabled } })
const userChangeStatusFailure = () => ({ type: USER_CHANGE_STATUS_FAILURE })

export const USER_CHANGE_PASSWORD_REQUEST = "USER_USER_CHANGE_PASSWORD_REQUEST";
export const USER_CHANGE_PASSWORD_SUCCESS = "USER_USER_CHANGE_PASSWORD_SUCCESS";
export const USER_CHANGE_PASSWORD_FAILURE = "USER_USER_CHANGE_PASSWORD_FAILURE";
const userChangePasswordRequest = () => ({ type: USER_CHANGE_PASSWORD_REQUEST })
const userChangePasswordSuccess = () => ({ type: USER_CHANGE_PASSWORD_SUCCESS })
const userChangePasswordFailure = () => ({ type: USER_CHANGE_PASSWORD_FAILURE })

export const USER_DELETE_REQUEST = "USER_DELETE_REQUEST";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_FAILURE = "USER_DELETE_FAILURE";
const userDeleteRequest = () => ({ type: USER_DELETE_REQUEST })
const userDeleteSuccess = () => ({ type: USER_DELETE_SUCCESS })
const userDeleteFailure = () => ({ type: USER_DELETE_FAILURE })

export const editUserStatus = (id, isEnabled) => async dispatch => {
    dispatch(userChangeStatusRequest());
    let isUpdated = false;
    await editUserStatusCall(id, isEnabled)
        .then(
            () => {
                dispatch(userChangeStatusSuccess(id, isEnabled));
                isUpdated = true;
            },
            error => {
                dispatch(userChangeStatusFailure());
                dispatch(alertError(error));
            }
        )
        return Promise.resolve(isUpdated);
}

export const deleteUser = (id) => async dispatch => {
    dispatch(userDeleteRequest());
    await deleteUser(id)
        .then(
            () => {
                dispatch(userDeleteSuccess());
                getAllUsers();
            },
            error => {
                dispatch(userDeleteFailure());
                dispatch(alertError(error));
            }
        )
}

export const getAllUsers = () => async dispatch => {
    dispatch(getUsersRequest());
    await getAllUsersCall()
        .then(
            users => {
                dispatch(getUsersSuccess(users.users));
            },
            error => {
                dispatch(getUsersFailure());
                dispatch(alertError(error));
            }
        );
}