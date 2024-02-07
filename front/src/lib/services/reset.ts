import api from "./api";
import { ApiSuccessBase } from "@/types/ApiBase";

export const resetApi = api.injectEndpoints({
    endpoints: (build) => ({
        forgetPassword: build.mutation<ApiSuccessBase<any>, Record<"email", string>>({
            query: (user) => ({
                url: "/forgot_password/",
                method: "POST",
                body: user,
            }),
        }),
        // resetPassword: build.mutation<ApiSuccessBase<any>, Record<"password" | "token", string>>({
        //     query: (password, token) => ({
        //         url: `/forgot_password/${token}`,
        //         method: "POST",
        //         body: password,
        //     }),
        // }),
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
        })
    }),
    overrideExisting: true,
});

export const {
    useForgetPasswordMutation,
    // useResetPasswordMutation,
    useResetUserTokenMutation,
    useValidateEmailTokenMutation
} = resetApi;