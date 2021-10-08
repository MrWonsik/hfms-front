export const MODAL_CLEAR = 'MODAL_CLEAR'
export const clearModal = () => ({ type: MODAL_CLEAR })

export const OPEN_MODAL_CHANGE_PASSWORD = 'OPEN_MODAL_CHANGE_PASSWORD'
export const CLOSE_MODAL_CHANGE_PASSWORD = 'CLOSE_MODAL_CHANGE_PASSWORD'
export const openModalChangePassword = () => ({ type: OPEN_MODAL_CHANGE_PASSWORD })
export const closeModalChangePassword = () => ({ type: CLOSE_MODAL_CHANGE_PASSWORD })

export const OPEN_MODAL_CHANGE_PASSWORD_USERS = 'OPEN_MODAL_CHANGE_PASSWORD_USERS'
export const CLOSE_MODAL_CHANGE_PASSWORD_USERS = 'CLOSE_MODAL_CHANGE_PASSWORD_USERS'
export const openModalChangePasswordUsers = (id) => ({ type: OPEN_MODAL_CHANGE_PASSWORD_USERS, payload: { id } })
export const closeModalChangePasswordUsers = () => ({ type: CLOSE_MODAL_CHANGE_PASSWORD_USERS })

export const OPEN_MODAL_ADD_NEW_USER = 'OPEN_MODAL_ADD_NEW_USER'
export const CLOSE_MODAL_ADD_NEW_USER = 'CLOSE_MODAL_ADD_NEW_USER'
export const openModalAddNewUser = () => ({ type: OPEN_MODAL_ADD_NEW_USER })
export const closeModalAddNewUser = () => ({ type: CLOSE_MODAL_ADD_NEW_USER })

export const OPEN_MODAL_ADD_NEW_SHOP = 'OPEN_MODAL_ADD_NEW_SHOP'
export const CLOSE_MODAL_ADD_NEW_SHOP = 'CLOSE_MODAL_ADD_NEW_SHOP'
export const openModalAddNewShop = () => ({ type: OPEN_MODAL_ADD_NEW_SHOP })
export const closeModalAddNewShop = () => ({ type: CLOSE_MODAL_ADD_NEW_SHOP })

export const OPEN_CONFIRMATION_MODAL = 'OPEN_CONFIRMATION_MODAL'
export const CLOSE_CONFIRMATION_MODAL = 'CLOSE_CONFIRMATION_MODAL'
export const openConfirmationModal = (contextId) => ({ type: OPEN_CONFIRMATION_MODAL, payload: { contextId } })
export const closeConfirmationModal = () => ({ type: CLOSE_CONFIRMATION_MODAL })

export const OPEN_MODAL_ADD_NEW_CATEGORY = 'OPEN_MODAL_ADD_NEW_CATEGORY'
export const CLOSE_MODAL_ADD_NEW_CATEGORY = 'CLOSE_MODAL_ADD_NEW_CATEGORY'
export const openModalAddNewCategory = () => ({ type: OPEN_MODAL_ADD_NEW_CATEGORY })
export const closeModalAddNewCategory = () => ({ type: CLOSE_MODAL_ADD_NEW_CATEGORY })

export const OPEN_MODAL_EDIT_MAXIMUM_COST = 'OPEN_MODAL_EDIT_MAXIMUM_COST'
export const CLOSE_MODAL_EDIT_MAXIMUM_COST = 'CLOSE_MODAL_EDIT_MAXIMUM_COST'
export const openModalEditMaximumAmount = (contextId) => ({ type: OPEN_MODAL_EDIT_MAXIMUM_COST, payload: { contextId } })
export const closeModalEditMaximumAmount = () => ({ type: CLOSE_MODAL_EDIT_MAXIMUM_COST })

export const OPEN_MODAL_EDIT_CATEGORY = 'OPEN_MODAL_EDIT_CATEGORY'
export const CLOSE_MODAL_EDIT_CATEGORY = 'CLOSE_MODAL_EDIT_CATEGORY'
export const openModalEditCategory = (contextId) => ({ type: OPEN_MODAL_EDIT_CATEGORY, payload: { contextId } })
export const closeModalEditCategory = () => ({ type: CLOSE_MODAL_EDIT_CATEGORY })

export const OPEN_MODAL_ADD_NEW_TRANSACTION = 'OPEN_MODAL_ADD_NEW_TRANSACTION'
export const CLOSE_MODAL_ADD_NEW_TRANSACTION = 'CLOSE_MODAL_ADD_NEW_TRANSACTION'
export const openModalAddNewTransaction = () => ({ type: OPEN_MODAL_ADD_NEW_TRANSACTION })
export const closeModalAddNewTransaction = () => ({ type: CLOSE_MODAL_ADD_NEW_TRANSACTION })

export const OPEN_TRANSACTION_DETAILS_MODAL = 'OPEN_TRANSACTION_DETAILS_MODAL'
export const CLOSE_TRANSACTION_DETAILS_MODAL = 'CLOSE_TRANSACTION_DETAILS_MODAL'
export const openTransactionDetailsModal = (contextId) => ({ type: OPEN_TRANSACTION_DETAILS_MODAL, payload: { contextId } })
export const closeTransactionDetailsModal = () => ({ type: CLOSE_TRANSACTION_DETAILS_MODAL })

export const OPEN_CATEGORY_CHART_MODAL = 'OPEN_CATEGORY_CHART_MODAL'
export const CLOSE_CATEGORY_CHART_MODAL = 'CLOSE_CATEGORY_CHART_MODAL'
export const openCategoryChartModal = (contextId) => ({ type: OPEN_CATEGORY_CHART_MODAL, payload: { contextId } })
export const closeCategoryChartModal = () => ({ type: CLOSE_CATEGORY_CHART_MODAL })
