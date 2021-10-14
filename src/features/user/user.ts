import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginRequestCall } from './userApi';

type UserRole = "ROLE_ADMIN" | "ROLE_USER"

interface credentials {
    username: string,
    password: string
}

interface User {
    id: string,
    role: UserRole,
    username: string,
    token: string
}

interface UserState {
    loggingIn: boolean
    loggedIn: boolean
    updatingPasswordInProgress: boolean,
    currentPage: '',
    user: User
}

const initialState: UserState = {
    loggingIn: false,
    loggedIn: false,
    updatingPasswordInProgress: false,
    currentPage: '',
    user: {} as User
}

export const login = createAsyncThunk(
    "user/login",
    async (credentials: credentials) => {
        const response = await loginRequestCall(credentials)
        return response
    }
);

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => initialState
  },
  extraReducers(builder) {
    builder
        .addCase(login.pending, (state) => {
            state.loggingIn = true
            state.loggedIn = false
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loggingIn = false
            state.loggedIn = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state) => {
            state.loggingIn = false
            state.loggedIn = false
        })
  }
  
});

export const { logOut } = user.actions;

export default user.reducer;
