import {
	OPEN_MODAL_CHANGE_PASSWORD,
	CLOSE_MODAL_CHANGE_PASSWORD,
	OPEN_MODAL_CHANGE_PASSWORD_USERS,
	CLOSE_MODAL_CHANGE_PASSWORD_USERS,
	OPEN_MODAL_ADD_NEW_USER,
	CLOSE_MODAL_ADD_NEW_USER,
	MODAL_CLEAR,
	OPEN_MODAL_ADD_NEW_SHOP,
	CLOSE_MODAL_ADD_NEW_SHOP,
	OPEN_CONFIRMATION_MODAL,
	CLOSE_CONFIRMATION_MODAL,
	OPEN_MODAL_ADD_NEW_CATEGORY,
	CLOSE_MODAL_ADD_NEW_CATEGORY,
	OPEN_MODAL_EDIT_MAXIMUM_COST,
	CLOSE_MODAL_EDIT_MAXIMUM_COST,
	OPEN_MODAL_EDIT_CATEGORY,
	CLOSE_MODAL_EDIT_CATEGORY
} from "./modal.actions";

const initialState = {
	changePasswordModalIsOpen: false,
	changePasswordModalUsers: { isOpen: false, id: ""},
	addNewUserModalIsOpen: false,
	confirmationModal: { isOpen: false, id: ""},
	editMaximumCostModal: { isOpen: false, id: ""},
	addNewCategoryModalIsOpen: false,
	editCategoryModal: {isOpen: false, id: ""}

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
		case OPEN_MODAL_CHANGE_PASSWORD_USERS: {
			const { id } = payload;
			return {
				...state,
				changePasswordModalUsers: { isOpen: true, id },
			};
		}
		case CLOSE_MODAL_CHANGE_PASSWORD_USERS:
			return {
				...state,
				changePasswordModalUsers: { isOpen: false },
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
		case OPEN_MODAL_ADD_NEW_SHOP:
			return {
				...state,
				addNewShopModalIsOpen: true,
			};
		case CLOSE_MODAL_ADD_NEW_SHOP:
			return {
				...state,
				addNewShopModalIsOpen: false,
			};
		case OPEN_CONFIRMATION_MODAL: {
			const { contextId } = payload;
			return {
				...state,
				confirmationModal: {isOpen: true, contextId },
			};
		}
		case CLOSE_CONFIRMATION_MODAL:
			return {
				...state,
				confirmationModal: {isOpen: false },
			};
		case OPEN_MODAL_EDIT_MAXIMUM_COST: {
			const { contextId } = payload;
			return {
				...state,
				editMaximumCostModal: {isOpen: true, contextId },
			};
		}
		case CLOSE_MODAL_EDIT_MAXIMUM_COST:
			return {
				...state,
				editMaximumCostModal: {isOpen: false },
			};
		case OPEN_MODAL_ADD_NEW_CATEGORY:
			return {
				...state,
				addNewCategoryModalIsOpen: true,
			};
		case CLOSE_MODAL_ADD_NEW_CATEGORY:
			return {
				...state,
				addNewCategoryModalIsOpen: false,
			};
		case OPEN_MODAL_EDIT_CATEGORY: {
			const { contextId } = payload;
			return {
				...state,
				editCategoryModal: {isOpen: true, contextId },
			};
		}
		case CLOSE_MODAL_EDIT_CATEGORY:
			return {
				...state,
				editCategoryModal: {isOpen: false },
			};
		case MODAL_CLEAR:
			return {};
		default:
			return state;
	}
};
