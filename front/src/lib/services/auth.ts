import api from "./api";
import { ApiSuccessBase } from "@/types/ApiBase";
import { LoginResponse } from "@/types/Auth";
import { User, UserCookieType, UserRegister, UserUpdate } from "@/types/User";
import { setCredentials } from "./slices/authSlice";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<User, UserRegister>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    login: build.mutation<LoginResponse, Record<"email" | "password", string>>({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    updateUser: build.mutation<User, UserUpdate>({
      query: (user) => ({
        url: "/users/me",
        method: "PATCH",
        body: user,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch, }) {
        const { data: user } = await queryFulfilled;
        dispatch(setCredentials({ user }));
      },
    }),
    forgetPassword: build.mutation<ApiSuccessBase<any>, Record<"email", string>>({
      query: (user) => ({
        url: "/forgot_password/",
        method: "POST",
        body: user,
      }),
    }),
    resetUserToken: build.mutation<ApiSuccessBase<any>, Record<"email", string>>({
      query: (user) => ({
        url: "/users/resend-email",
        method: "POST",
        body: user,
      }),
    }),
    validateEmailToken: build.mutation<ApiSuccessBase<any>, Record<"token", string>>({
      query: (token) => ({
        url: `/users/token/${token}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useForgetPasswordMutation,
  useResetUserTokenMutation,
  useValidateEmailTokenMutation,
} = authApi;
