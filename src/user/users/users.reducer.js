import {
	GET_USERS_REQUEST,
	GET_USERS_SUCCESS,
	GET_USERS_FAILURE,
	GET_USERS_CLEAR,
	USER_CHANGE_STATUS_SUCCESS,
	USER_CHANGE_STATUS_FAILURE,
	USER_CHANGE_STATUS_REQUEST,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    USER_CHANGE_PASSWORD_REQUEST,
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_CHANGE_PASSWORD_FAILURE
} from "./users.actions";

const initialState = {
	users: [],
	isLoading: false,
    updatingPasswordInProgress: false,
    creatingUserInProgress: false
};

export const users = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_USERS_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case GET_USERS_SUCCESS:
			const { users } = payload;
			return {
				users,
				isLoading: false,
			};
		case GET_USERS_FAILURE:
			return {
				...state,
				isLoading: false,
			};
		case GET_USERS_CLEAR:
			return {};
		case USER_CHANGE_STATUS_REQUEST:
			return {
				...state,
			};
		case USER_CHANGE_STATUS_SUCCESS:
			const { id, isEnabled } = payload;
			return {
				...state,
				users: state.users.map((user, userId) =>
					userId === id ? { ...user, isEnabled: isEnabled } : user
				),
			};
		case USER_CHANGE_STATUS_FAILURE:
			return {
				...state,
			};
		case CREATE_USER_REQUEST:
			return {
				...state,
                creatingUserInProgress: true,
			};
		case CREATE_USER_SUCCESS:
			const { user } = payload;
            state.users.push(user);
			return {
				...state,
                creatingUserInProgress: false
			};
		case CREATE_USER_FAILURE:
			return {
				...state,
                creatingUserInProgress: false
			};
        case USER_CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                updatingPasswordInProgress: true,
            };
        case USER_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                updatingPasswordInProgress: false
            };
        case USER_CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                updatingPasswordInProgress: false
            };
		default:
			return state;
	}
};
