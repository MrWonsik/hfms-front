import { loginRequestCall, changePasswordRequestCall } from './user.service';
import { alertError, alertSuccess } from '../alert/alert.actions';
import { history } from '../_helpers';

export const LOGIN_REQUEST = "USER_LOGIN_REQUEST";
const loginRequest = (user) => ({ type: LOGIN_REQUEST, payload: { user } })

export const LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: { user } })

export const LOGIN_FAILURE = "USER_LOGIN_FAILURE";
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: { error } })

export const login = (username, password) => {

    return dispatch => {
        dispatch(loginRequest({ username }));

        loginRequestCall(username, password)
            .then(
                user => { 
                    dispatch(loginSuccess(user));
                    history.push('/home');
                },
                error => {
                    dispatch(loginFailure(error));
                    dispatch(alertError(error));
                }
            );
    };
}

export const LOGOUT = 'USER_LOGOUT';
export const logout = () => ({type: LOGOUT });

export const CHANGE_PASSWORD_REQUEST = 'USER_CHANGE_PASSWORD_REQUEST';
const changePasswordRequest = () => ({ type: CHANGE_PASSWORD_REQUEST })

export const CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS';
const changePasswordSuccess = () => ({ type: CHANGE_PASSWORD_SUCCESS })

export const CHANGE_PASSWORD_FAILURE = 'USER_CHANGE_PASSWORD_FAILURE';
const changePasswordFailure = (error) => ({ type: CHANGE_PASSWORD_FAILURE, payload: { error } })

export const changePassword = (oldPassword, newPassword, repeatedNewPassword, user) => async dispatch => {
    
    dispatch(changePasswordRequest({ oldPassword, newPassword, repeatedNewPassword }));
    let isPasswordChanged = false;
    await changePasswordRequestCall(oldPassword, newPassword, repeatedNewPassword, user)
        .then(
            () => {
                dispatch(changePasswordSuccess());
                dispatch(alertSuccess("Your password has been changed!"));
                isPasswordChanged = true;
            },
            error => {
                dispatch(changePasswordFailure(error));
                dispatch(alertError(error));
            }
        );
    return Promise.resolve(isPasswordChanged);
};