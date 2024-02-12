import api from "./api";
import { ApiSuccessBase } from "@/types/ApiBase";
import { LoginResponse } from "@/types/Auth";
import { User, UserCookieType, UserRegister, UserUpdateProfile, UserUpdatePassword } from "@/types/User";
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
    updateUserPassword: build.mutation<User, UserUpdatePassword>({
      query: (user) => ({
        url: "/users/password",
        method: "PATCH",
        body: user,
      }),
    }),
    updateUserProfile: build.mutation<User, UserUpdateProfile>({
      query: (user) => ({
        url: "/users/me",
        method: "PATCH",
        body: user,
      }),
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
    becomeAffiliate: build.mutation<{ kbis: string, name: string }, Record<"kbis" | "name", string>>({
      query: ({ kbis, name }) => ({
        url: "/companies",
        method: "POST",
        body: { kbis, name }
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
  useUpdateUserPasswordMutation,
  useUpdateUserProfileMutation,
  useForgetPasswordMutation,
  useResetUserTokenMutation,
  useBecomeAffiliateMutation,
  useValidateEmailTokenMutation,
} = authApi;
