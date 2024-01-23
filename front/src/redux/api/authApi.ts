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
        getAuthData: builder.query<LoginResponse, { token: string }>({
            query: ({ token }) => ({
                url: '/login',
                // this is the default but I'm leaving it here for reference
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

    }),
});

export const { useRegisterMutation, useGetAuthDataQuery } = appApi;