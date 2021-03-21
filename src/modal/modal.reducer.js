import {
	OPEN_MODAL_CHANGE_PASSWORD,
	CLOSE_MODAL_CHANGE_PASSWORD,
	OPEN_MODAL_CHANGE_PASSWORD_USERS,
	CLOSE_MODAL_CHANGE_PASSWORD_USERS,
	OPEN_MODAL_ADD_NEW_USER,
	CLOSE_MODAL_ADD_NEW_USER,
	MODAL_CLEAR,
} from "./modal.actions";

const initialState = {
	changePasswordModalIsOpen: false,
	changePasswordModalUsers: { isOpen: false, id: ""},
	addNewUserModalIsOpen: false
};

export const modals = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case OPEN_MODAL_CHANGE_PASSWORD:
			return {
				...state,
				changePasswordModalIsOpen: true,
			};
		case CLOSE_MODAL_CHANGE_PASSWORD:
			return {
				...state,
				changePasswordModalIsOpen: false,
			};
		case OPEN_MODAL_CHANGE_PASSWORD_USERS:
			const { id } = payload;
			return {
				...state,
				changePasswordModalUsers: { isOpen: true, id},
			};
		case CLOSE_MODAL_CHANGE_PASSWORD_USERS:
			return {
				...state,
				changePasswordModalUsers: { isOpen: false, id: ""},
			};
		case OPEN_MODAL_ADD_NEW_USER:
			return {
				...state,
				addNewUserModalIsOpen: true,
			};
		case CLOSE_MODAL_ADD_NEW_USER:
			return {
				...state,
				addNewUserModalIsOpen: false,
			};
		case MODAL_CLEAR:
			return {};
		default:
			return state;
	}
};
