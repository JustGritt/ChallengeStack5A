import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiErrorResponse, LoginResponse, RegisterResponse, User } from '../types/User';

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }) as BaseQueryFn<string | FetchArgs, unknown, { data: ApiErrorResponse, status: number }, {}>,
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, User>({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
        }),
        login: builder.mutation<LoginResponse, User>({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user,
            }),
        }),

    }),
});

export const { useRegisterMutation, useLoginMutation } = appApi;