

import { RootState } from "@/lib/services/store";
import { User } from "@/types/User";
import { createSelector, createSlice } from "@reduxjs/toolkit";
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

export const selectStateUser = (state: RootState) => state.auth;

export const selectCurrentUserConfig = (state: RootState) => (state.auth);

export const selectCurrentUserAuthValues = createSelector([selectCurrentUserConfig], state => ({
  isAdmin: state.isAdmin,
  isWorker: state.isWorker,
  isOwner: state.isOwner,
  isClient: state.isClient,
}))

export const selectCurrentUser = createSelector([selectStateUser], state => (state.user))

