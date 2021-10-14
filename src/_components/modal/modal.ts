import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalType = "changePassword" | "changeUserPassword" | "addNewUser"

interface ModalState {
    isOpen: boolean
    type?: ModalType
    context?: string
}

const initialState: ModalState = {
    isOpen: false,
} 

export const modal = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{type: ModalType, context: string}>) => {
        state.isOpen = true
        state.type = action.payload.type
        state.context = action.payload.context
    },
    closeModal: (state) => {
        state.isOpen = false,
        state.type = undefined
        state.context = undefined
    }
  }
});

export const { openModal, closeModal } = modal.actions;

export default modal.reducer;
