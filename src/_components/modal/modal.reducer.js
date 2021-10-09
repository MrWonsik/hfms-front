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
  CLOSE_MODAL_EDIT_CATEGORY,
  OPEN_MODAL_ADD_NEW_TRANSACTION,
  CLOSE_MODAL_ADD_NEW_TRANSACTION,
  OPEN_TRANSACTION_DETAILS_MODAL,
  CLOSE_TRANSACTION_DETAILS_MODAL,
  OPEN_CATEGORY_CHART_MODAL,
  CLOSE_CATEGORY_CHART_MODAL
} from './modal.actions'

const initialState = {
  changePasswordModalIsOpen: false,
  changePasswordModalUsers: { isOpen: false, id: '' },
  addNewUserModalIsOpen: false,
  confirmationModal: { isOpen: false, id: '' },
  editMaximumAmountModal: { isOpen: false, id: '' },
  addNewCategoryModalIsOpen: false,
  editCategoryModal: { isOpen: false, id: '' },
  transactionDetailsModalIsOpen: false,
  categoryChartModal: { isOpen: false, id: '' }
}

export const modals = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case OPEN_MODAL_CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordModalIsOpen: true
      }
    case CLOSE_MODAL_CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordModalIsOpen: false
      }
    case OPEN_MODAL_CHANGE_PASSWORD_USERS: {
      const { id } = payload
      return {
        ...state,
        changePasswordModalUsers: { isOpen: true, id }
      }
    }
    case CLOSE_MODAL_CHANGE_PASSWORD_USERS:
      return {
        ...state,
        changePasswordModalUsers: { isOpen: false }
      }
    case OPEN_MODAL_ADD_NEW_USER:
      return {
        ...state,
        addNewUserModalIsOpen: true
      }
    case CLOSE_MODAL_ADD_NEW_USER:
      return {
        ...state,
        addNewUserModalIsOpen: false
      }
    case OPEN_MODAL_ADD_NEW_SHOP:
      return {
        ...state,
        addNewShopModalIsOpen: true
      }
    case CLOSE_MODAL_ADD_NEW_SHOP:
      return {
        ...state,
        addNewShopModalIsOpen: false
      }
    case OPEN_CONFIRMATION_MODAL: {
      const { contextId } = payload
      return {
        ...state,
        confirmationModal: { isOpen: true, contextId }
      }
    }
    case CLOSE_CONFIRMATION_MODAL:
      return {
        ...state,
        confirmationModal: { isOpen: false }
      }
    case OPEN_MODAL_EDIT_MAXIMUM_COST: {
      const { contextId } = payload
      return {
        ...state,
        editMaximumAmountModal: { isOpen: true, contextId }
      }
    }
    case CLOSE_MODAL_EDIT_MAXIMUM_COST:
      return {
        ...state,
        editMaximumAmountModal: { isOpen: false }
      }
    case OPEN_MODAL_ADD_NEW_CATEGORY:
      return {
        ...state,
        addNewCategoryModalIsOpen: true
      }
    case CLOSE_MODAL_ADD_NEW_CATEGORY:
      return {
        ...state,
        addNewCategoryModalIsOpen: false
      }
    case OPEN_MODAL_EDIT_CATEGORY: {
      const { contextId } = payload
      return {
        ...state,
        editCategoryModal: { isOpen: true, contextId }
      }
    }
    case CLOSE_MODAL_EDIT_CATEGORY:
      return {
        ...state,
        editCategoryModal: { isOpen: false }
      }
    case OPEN_MODAL_ADD_NEW_TRANSACTION:
      return {
        ...state,
        addNewTransactionModalIsOpen: true
      }
    case CLOSE_MODAL_ADD_NEW_TRANSACTION:
      return {
        ...state,
        addNewTransactionModalIsOpen: false
      }
    case OPEN_TRANSACTION_DETAILS_MODAL: {
      const { contextId } = payload
      return {
        ...state,
        transactionDetailsModal: { isOpen: true, contextId: contextId }
      }
    }
    case CLOSE_TRANSACTION_DETAILS_MODAL:
      return {
        ...state,
        transactionDetailsModal: { isOpen: false }
      }
    case OPEN_CATEGORY_CHART_MODAL: {
      const { contextId } = payload
      return {
        ...state,
        categoryChartModal: { isOpen: true, id: contextId }
      }
    }
    case CLOSE_CATEGORY_CHART_MODAL:
      return {
        ...state,
        categoryChartModal: { isOpen: false }
      }
    case MODAL_CLEAR:
      return {}
    default:
      return state
  }
}
