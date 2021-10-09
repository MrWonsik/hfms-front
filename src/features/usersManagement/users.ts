import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UsersState {
  users: Array<any>,
  isLoading: boolean,
  updatingPasswordInProgress: boolean,
  creatingUserInProgress: boolean
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  updatingPasswordInProgress: false,
  creatingUserInProgress: false,
};

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersRequest: (state) => {
      state.isLoading = true;
    },
    getUsersSuccess: (state, action: PayloadAction<Array<any>>): void => {
      state.users = action.payload;
      state.isLoading = false;
    },
    getUsersFailure: (state): void => {
      state.isLoading = false;
    },
    getUsersClear: (state): void => {
      state = initialState;
    },
    userChangeStatusSuccess: (state, action: PayloadAction<{ id: number, isEnabled: boolean}>): void => {
      state.users = state.users.map((user, userId) => userId === action.payload.id ? { ...user, isEnabled: action.payload.isEnabled } : user)
    },
    createUserRequest: (state): void => {
      state.creatingUserInProgress = true;
    },
    createUserSuccess: (state, action: PayloadAction<{ user: any}>): void => {
      state.users.push(action.payload.user);
      state.creatingUserInProgress = false;
    },
    createUserFailure: (state): void => {
      state.creatingUserInProgress = false;
    },
    changeUserPasswordRequest: (state): void => {
      state.updatingPasswordInProgress = true;
    },
    changeUserPasswordSuccess: (state): void => {
      state.updatingPasswordInProgress = false;
    },
    changeUserPasswordFailure: (state): void => {
      state.updatingPasswordInProgress = false;
    },
  },
  
});

// Action creators are generated for each case reducer function
export const { getUsersRequest, getUsersSuccess, getUsersFailure, getUsersClear } = users.actions;

export default users.reducer;
