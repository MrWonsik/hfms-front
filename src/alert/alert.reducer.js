import {
  ALERT_SUCCESS,
  ALERT_CLEAR,
  ALERT_ERROR
} from "./alert.actions"

export const alert = (state = {}, action) => {
  const { type, payload} = action;
  switch (type) {
    case ALERT_SUCCESS: {
      const { message: successMessage } = payload
      return {
        type: 'success',
        message: successMessage
      };
    }
    case ALERT_ERROR: {
      const { message: errorMessage } = payload
      return {
        type: 'danger',
        message: errorMessage
      };
    }
    case ALERT_CLEAR:
      return {};
    default:
      return state
  }
}