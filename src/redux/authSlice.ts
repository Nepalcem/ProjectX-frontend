import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
  email: string;
  id: string;
};

type AuthState = {
  token: string | null;
  user: AuthUser | null;
};

type SetCredentialsPayload = {
  token: string;
  user: AuthUser;
};

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
