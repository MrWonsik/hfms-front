import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UsersState {
  users: Array<any>,
  isUsersLoading: boolean,
  updatingPasswordInProgress: boolean,
  creatingUserInProgress: boolean
}

const initialState: UsersState = {
  users: [],
  isUsersLoading: false,
  updatingPasswordInProgress: false,
  creatingUserInProgress: false,
};

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersRequest: (state) => {
      state.isUsersLoading = true;
    },
    getUsersSuccess: (state, action: PayloadAction<Array<any>>): void => {
      state.users = action.payload;
      state.isUsersLoading = false;
    },
    getUsersFailure: (state): void => {
      state.isUsersLoading = false;
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

export const { getUsersRequest, getUsersSuccess, getUsersFailure, getUsersClear, 
  userChangeStatusSuccess, createUserRequest, createUserSuccess, createUserFailure,
changeUserPasswordFailure, changeUserPasswordRequest, changeUserPasswordSuccess } = users.actions;

export default users.reducer;
