export const ALERT_SUCCESS = 'ALERT_SUCCESS';
export const alertSuccess = message => ({ type: ALERT_SUCCESS, payload: { message } });

export const ALERT_ERROR = 'ALERT_ERROR';
export const alertError = message => ({ type: ALERT_ERROR, payload: { message } });

export const ALERT_CLEAR = 'ALERT_CLEAR';
export const alertClear = () => ({ type: ALERT_CLEAR });
