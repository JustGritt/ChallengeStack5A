import api from "./api";
import { ApiSuccessBase } from "@/types/ApiBase";
import { LoginResponse } from "@/types/Auth";
import { User } from "@/types/User";
import { setCredentials } from "./slices/authSlice";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (user: Record<"email" | "password", string>) => ({
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
    getMyProfile: build.query<User, string>({
      query: (token) => {
        return {
          url: `/getMyProfile`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      async onQueryStarted(token, { queryFulfilled, dispatch }) {
        const { data: user } = await queryFulfilled;
        dispatch(setCredentials({ user, token }));
      },
      providesTags: ["Me"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMyProfileQuery,
  useLazyGetMyProfileQuery
} = authApi;
