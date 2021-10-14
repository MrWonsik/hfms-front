import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllUsersCall } from './usersApi';

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

export const getAllUsers = createAsyncThunk(
  "users/getAll",
  async () => {
      const response = await getAllUsersCall()
      return response.users;
  }
);

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserState: () => initialState,
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
  extraReducers(builder) {
    builder
        .addCase(getAllUsers.pending, (state) => {
            state.isUsersLoading = true
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.isUsersLoading = false
            state.users = action.payload
        })
        .addCase(getAllUsers.rejected, (state) => {
            state.isUsersLoading = false
        })
      }
});

export const { clearUserState, 
  userChangeStatusSuccess, createUserRequest, createUserSuccess, createUserFailure,
changeUserPasswordFailure, changeUserPasswordRequest, changeUserPasswordSuccess } = users.actions;

export default users.reducer;
