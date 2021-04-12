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

export const OPEN_MODAL_ADD_NEW_SHOP = "OPEN_MODAL_ADD_NEW_SHOP";
export const CLOSE_MODAL_ADD_NEW_SHOP = "CLOSE_MODAL_ADD_NEW_SHOP";
export const openModalAddNewShop = () => ({ type: OPEN_MODAL_ADD_NEW_SHOP});
export const closeModalAddNewShop = () => ({ type: CLOSE_MODAL_ADD_NEW_SHOP });

export const OPEN_CONFIRMATION_MODAL = "OPEN_CONFIRMATION_MODAL";
export const CLOSE_CONFIRMATION_MODAL = "CLOSE_CONFIRMATION_MODAL";
export const openConfirmationModal = (contextId) => ({ type: OPEN_CONFIRMATION_MODAL, payload: {contextId}});
export const closeConfirmationModal = () => ({ type: CLOSE_CONFIRMATION_MODAL });

export const OPEN_MODAL_ADD_NEW_CATEGORY = "OPEN_MODAL_ADD_NEW_CATEGORY";
export const CLOSE_MODAL_ADD_NEW_CATEGORY = "CLOSE_MODAL_ADD_NEW_CATEGORY";
export const openModalAddNewCategory = () => ({ type: OPEN_MODAL_ADD_NEW_CATEGORY});
export const closeModalAddNewCategory = () => ({ type: CLOSE_MODAL_ADD_NEW_CATEGORY });


export const OPEN_MODAL_EDIT_MAXIMUM_COST = "OPEN_MODAL_EDIT_MAXIMUM_COST";
export const CLOSE_MODAL_EDIT_MAXIMUM_COST = "CLOSE_MODAL_EDIT_MAXIMUM_COST";
export const openModalEditMaximumCost = (contextId) => ({ type: OPEN_MODAL_EDIT_MAXIMUM_COST, payload: {contextId}});
export const closeModalEditMaximumCost = () => ({ type: CLOSE_MODAL_EDIT_MAXIMUM_COST });