import { getAllUsersCall, editUserStatusCall, deleteUserCall, createUserCall, editUserPasswordCall } from './users.service'
import { alertError, alertSuccess } from '../../alert/alert.actions'

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
const userChangeStatusRequest = (id) => ({ type: USER_CHANGE_STATUS_REQUEST, payload: { id } })
const userChangeStatusSuccess = (user) => ({ type: USER_CHANGE_STATUS_SUCCESS, payload: { id: user.id, isEnabled: user.isEnabled } })
const userChangeStatusFailure = () => ({ type: USER_CHANGE_STATUS_FAILURE })

export const USER_CHANGE_PASSWORD_REQUEST = "USER_CHANGE_PASSWORD_REQUEST";
export const USER_CHANGE_PASSWORD_SUCCESS = "USER_CHANGE_PASSWORD_SUCCESS";
export const USER_CHANGE_PASSWORD_FAILURE = "USER_CHANGE_PASSWORD_FAILURE";
const userChangePasswordRequest = () => ({ type: USER_CHANGE_PASSWORD_REQUEST })
const userChangePasswordSuccess = () => ({ type: USER_CHANGE_PASSWORD_SUCCESS })
const userChangePasswordFailure = () => ({ type: USER_CHANGE_PASSWORD_FAILURE })

export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
const createUserRequest = () => ({ type: CREATE_USER_REQUEST })
const createUserSuccess = (user) => ({ type: CREATE_USER_SUCCESS, payload: { user } })
const createUserFailure = () => ({ type: CREATE_USER_FAILURE })

export const USER_DELETE_REQUEST = "USER_DELETE_REQUEST";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_FAILURE = "USER_DELETE_FAILURE";
const userDeleteRequest = (id) => ({ type: USER_DELETE_REQUEST, payload: { id } })
const userDeleteSuccess = () => ({ type: USER_DELETE_SUCCESS })
const userDeleteFailure = () => ({ type: USER_DELETE_FAILURE })

export const editUserStatus = (id, isEnabled) => async dispatch => {
    dispatch(userChangeStatusRequest(id));
    await editUserStatusCall(id, isEnabled)
        .then(
            user => {
                dispatch(userChangeStatusSuccess(user));
                dispatch(getAllUsers());
                dispatch(alertSuccess(user.username + " account has been " + (user.isEnabled ? "enabled." : "disabled.")))
            },
            error => {
                dispatch(userChangeStatusFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        )
}

export const editUserPassword = (newPassword, id) => async dispatch => {
    dispatch(userChangePasswordRequest(id));
    let isUserPasswordChanged = false;
    await editUserPasswordCall(newPassword, id)
        .then(
            user => {
                dispatch(userChangePasswordSuccess());
                isUserPasswordChanged = true;
                dispatch(alertSuccess(user.username + " password has been changed."))
            },
            error => {
                dispatch(userChangePasswordFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        )
    return Promise.resolve(isUserPasswordChanged);
}

export const deleteUser = (id) => async dispatch => {
    dispatch(userDeleteRequest(id));
    await deleteUserCall(id)
        .then(
            user => {
                dispatch(userDeleteSuccess(user.id));
                dispatch(getAllUsers());
                dispatch(alertSuccess(user.username + " account has been deleted."))
            },
            error => {
                dispatch(userDeleteFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        )
}

export const createUser = (username, password, role) => async dispatch => {
    dispatch(createUserRequest());
    let isUserCreated = false;
    await createUserCall(username, password, role)
        .then(
            user => {
                dispatch(createUserSuccess(user));
                dispatch(getAllUsers());
                isUserCreated = true;
                dispatch(alertSuccess(user.username + " account has been created."))
            },
            error => {
                dispatch(createUserFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        )
    return Promise.resolve(isUserCreated);
}

export const getAllUsers = () => async dispatch => {
    dispatch(getUsersRequest());
    await getAllUsersCall()
        .then(
            users => {
                dispatch(getUsersSuccess(users));
            },
            error => {
                dispatch(getUsersFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
}