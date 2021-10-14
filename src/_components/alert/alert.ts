import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
    type: "success" | "danger",
    message: string
}

const initialState: AlertState = {} as AlertState

export const alert = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    alertSucces: (state, action: PayloadAction<string>) => {
        state.type = "success"
        state.message = action.payload
    },
    alertError: (state, action: PayloadAction<string>) => {
        state.type="danger"
        state.message = action.payload
    }, 
    alertClear: (state) => {
        state = initialState
    }
  }
});

export const {  } = alert.actions;

export default alert.reducer;
