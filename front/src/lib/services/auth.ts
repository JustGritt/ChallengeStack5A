import api from "./api";
import { ApiSuccessBase } from "@/types/ApiBase";
import { LoginResponse } from "@/types/Auth";
import { User, UserCookieType, UserRegister } from "@/types/User";
import { setCredentials } from "./slices/authSlice";
import { getUserCookie, setUserCookie } from "../helpers/UserHelper";

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
    getMyProfile: build.query<User, void>({
      query: () => {
        return {
          url: `/users/me`,
          method: "GET",
        };
      },
      async onQueryStarted(_, { queryFulfilled, dispatch, }) {
        const session = await getUserCookie(UserCookieType.SESSION);
        const parsedSession = JSON.parse(session?.value || "{}");
        if (parsedSession.user) {
          dispatch(setCredentials({ user: parsedSession.user }));
          return
        }
        const { data: user } = await queryFulfilled;
        setUserCookie(UserCookieType.SESSION, (JSON.stringify({
          ...parsedSession,
          user: user
        })));
        // const userString = JSON.stringify(user);
        dispatch(setCredentials({ user }));
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
