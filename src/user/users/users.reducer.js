import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_CLEAR,
  } from "./users.actions";
  
  export const users = (state = {}, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_USERS_REQUEST:
        return state;
      case GET_USERS_SUCCESS:
        const { users } = payload;
        return {
          users: users,
        };
      case GET_USERS_FAILURE:
        return state;
      case GET_USERS_CLEAR:
        return {};
      default:
        return state;
    }
  };
  