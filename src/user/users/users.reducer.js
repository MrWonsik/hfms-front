import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_CLEAR,
    USER_CHANGE_STATUS_SUCCESS,
    USER_CHANGE_STATUS_FAILURE,
    USER_CHANGE_STATUS_REQUEST,
  } from "./users.actions";
  
const initialState = {
  users: [],
  isLoading: false
}

export const users = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_USERS_SUCCESS:
      const { users } = payload;
      return {
        users: users,
        isLoading: false
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        isLoading: false};
    case GET_USERS_CLEAR:
      return {};
    case USER_CHANGE_STATUS_REQUEST:
      return {
        ...state
      }
    case USER_CHANGE_STATUS_SUCCESS:
      const { id, isEnabled } = payload;
      return {
        ...state,
        users: state.users.map((user, userId) => userId === id ? {...user, isEnabled: isEnabled} : user)
      }
    case USER_CHANGE_STATUS_FAILURE:
      return {
        ...state
      }
    default:
      return state;
  }
};
  