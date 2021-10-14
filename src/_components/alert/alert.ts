import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AlertType = "success" | "danger"
interface AlertState {
    type: AlertType,
    message: string
}

const initialState: AlertState = {} as AlertState

export const alert = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    alertSuccess: (state, action: PayloadAction<string>) => {
        state.type = "success"
        state.message = action.payload
    },
    alertError: (state, action: PayloadAction<string>) => {
        state.type="danger"
        state.message = action.payload
    }, 
    alertClear: () => initialState
  }
});

export const { alertSuccess, alertError, alertClear } = alert.actions;

export default alert.reducer;
