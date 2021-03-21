import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE
} from "./user.actions";

export const user = (state = {updatingPasswordInProgress: false}, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      const { user } = payload;
      return {
        loggingIn: true,
        user: user,
      };
    case LOGIN_SUCCESS:
      const { user: userLoginIn } = payload;
      return {
        loggedIn: true,
        user: userLoginIn,
      };
    case LOGIN_FAILURE:
      return {};
    case LOGOUT:
      return {};
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        updatingPasswordInProgress: true
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatingPasswordInProgress: false
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        updatingPasswordInProgress: false
      };
    default:
      return state;
  }
};
