import { loginRequestCall, changePasswordRequestCall } from './user.service';
import { alertError, alertSuccess } from '../alert/alert.actions';

export const LOGIN_REQUEST = "USER_LOGIN_REQUEST";
const loginRequest = (user) => ({ type: LOGIN_REQUEST, payload: { user } })

export const LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: { user } })

export const LOGIN_FAILURE = "USER_LOGIN_FAILURE";
const loginFailure = () => ({ type: LOGIN_FAILURE })

export const login = (username, password) => async dispatch => {
    dispatch(loginRequest({ username }));
    let loggedSuccess = false;
    await loginRequestCall(username, password)
        .then(
            user => { 
                dispatch(loginSuccess(user));
                loggedSuccess = true;
            },
            error => {
                dispatch(loginFailure());
                dispatch(alertError(error.msg));
            }
        );
    return Promise.resolve(loggedSuccess);
};

export const LOGOUT = 'USER_LOGOUT';
export const logout = () => ({type: LOGOUT });

export const CHANGE_PASSWORD_REQUEST = 'USER_CHANGE_PASSWORD_REQUEST';
const changePasswordRequest = () => ({ type: CHANGE_PASSWORD_REQUEST })

export const CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS';
const changePasswordSuccess = () => ({ type: CHANGE_PASSWORD_SUCCESS })

export const CHANGE_PASSWORD_FAILURE = 'USER_CHANGE_PASSWORD_FAILURE';
const changePasswordFailure = () => ({ type: CHANGE_PASSWORD_FAILURE })

export const changePassword = (oldPassword, newPassword, repeatedNewPassword) => async dispatch => {
    
    dispatch(changePasswordRequest());
    let isPasswordChanged = false;
    await changePasswordRequestCall(oldPassword, newPassword, repeatedNewPassword)
        .then(
            () => {
                dispatch(changePasswordSuccess());
                dispatch(alertSuccess("Your password has been changed!"));
                isPasswordChanged = true;
            },
            error => {
                dispatch(changePasswordFailure());
                dispatch(alertError(error.msg));
                return Promise.reject(error);
            }
        );
    return Promise.resolve(isPasswordChanged);
};

export const CHANGE_PAGE = 'CHANGE_PAGE';
export const changePage = (pageName) => ({ type: CHANGE_PAGE, payload: { pageName }})