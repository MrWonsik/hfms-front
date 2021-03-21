export const MODAL_CLEAR = "MODAL_CLEAR";
export const clearModal = () => ({ type: MODAL_CLEAR });

export const OPEN_MODAL_CHANGE_PASSWORD = "OPEN_MODAL_CHANGE_PASSWORD";
export const CLOSE_MODAL_CHANGE_PASSWORD = "CLOSE_MODAL_CHANGE_PASSWORD";
export const openModalChangePassword = () => ({
	type: OPEN_MODAL_CHANGE_PASSWORD,
});
export const closeModalChangePassword = () => ({
	type: CLOSE_MODAL_CHANGE_PASSWORD,
});

export const OPEN_MODAL_CHANGE_PASSWORD_USERS = "OPEN_MODAL_CHANGE_PASSWORD_USERS";
export const CLOSE_MODAL_CHANGE_PASSWORD_USERS = "CLOSE_MODAL_CHANGE_PASSWORD_USERS";
export const openModalChangePasswordUsers = (id) => ({
	type: OPEN_MODAL_CHANGE_PASSWORD_USERS, payload: { id }
});
export const closeModalChangePasswordUsers = () => ({
	type: CLOSE_MODAL_CHANGE_PASSWORD_USERS,
});

export const OPEN_MODAL_ADD_NEW_USER = "OPEN_MODAL_ADD_NEW_USER";
export const CLOSE_MODAL_ADD_NEW_USER = "CLOSE_MODAL_ADD_NEW_USER";
export const openModalAddNewUser = () => ({ type: OPEN_MODAL_ADD_NEW_USER });
export const closeModalAddNewUser = () => ({ type: CLOSE_MODAL_ADD_NEW_USER });
