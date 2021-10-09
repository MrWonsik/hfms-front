let timer = null

export const ALERT_SUCCESS = 'ALERT_SUCCESS'
export const setAlertSuccess = message => ({ type: ALERT_SUCCESS, payload: { message } })

export const alertSuccess = (msg) => dispatch => {
  if (timer) {
    clearTimeout(timer) // cancel the previous timer.
    timer = null
  }
  dispatch(setAlertSuccess(msg))
  timer = setTimeout(() => dispatch(alertClear()), 6000) // close after 6 seconds
}

export const ALERT_ERROR = 'ALERT_ERROR'
export const setAlertError = message => ({ type: ALERT_ERROR, payload: { message } })

export const alertError = (msg) => dispatch => {
  if (timer) {
    clearTimeout(timer) // cancel the previous timer.
    timer = null
  }
  dispatch(setAlertError(msg))
  timer = setTimeout(() => dispatch(alertClear()), 6000) // close after 6 seconds
}

export const ALERT_CLEAR = 'ALERT_CLEAR'
export const alertClear = () => ({ type: ALERT_CLEAR })
