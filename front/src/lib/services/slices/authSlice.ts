

import { RootState } from "@/lib/services/store";
import { User } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
  isAdmin: boolean;
  isWorker: boolean;
  isOwner: boolean;
  isClient: boolean;
  token: string | undefined;
};

const initialState: AuthState = {
  user: null,
  isAdmin: false,
  isWorker: false,
  isClient: false,
  isOwner: false,
  token: undefined,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user?: User; token?: string }>
    ) => {
      state.token = token;
      if (user) {
        state.user = user;
        state.isAdmin = user.roles.includes('ROLE_SUPER_ADMIN');
        state.isWorker = !!user.work;
        state.isOwner = !!user.companie;
        state.isClient = !state.isAdmin && !state.isWorker && !state.isOwner;
      }
    },
    resetCredentials: () => initialState,
  },
});

export const { setCredentials, resetCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectCurrentUserConfig = (state: RootState) => ({
  isAdmin: state.auth.isAdmin,
  isWorker: state.auth.isWorker,
  isOwner: state.auth.isOwner,
  isClient: state.auth.isClient,
});
