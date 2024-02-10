import api from "./api";
import { User, UserCookieType, UserRegister, UserUpdate } from "@/types/User";
import { setCredentials } from "./slices/authSlice";
import { getUserCookie, setUserCookie } from "../helpers/UserHelper";
import { HydraPaginateResp } from "@/types/HydraPaginateResp";
import { Schedule } from "@/types/Schedule";

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUserSchedules: build.query<HydraPaginateResp<Schedule>, string>({
            query: (idUser) => {
                return {
                    url: `/users/${idUser}/schedules`,
                };
            },
            providesTags: (result, _error, filters) =>
                result
                    ? [
                        ...result['hydra:member'].map(({ id }) => ({
                            type: "UserSchedules" as const,
                            id,
                        })),
                        { type: "UserSchedules", id: "LIST" },
                    ]
                    : [],
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
                if (session.user) {
                    dispatch(setCredentials({ user: session.user }));
                    return
                }
                const { data: user } = await queryFulfilled;
                setUserCookie(UserCookieType.SESSION, ({
                    user: user
                }));
                dispatch(setCredentials({ user }));
            },
            providesTags: ["Me"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetMyProfileQuery,
    useLazyGetMyProfileQuery,
    useLazyGetUserSchedulesQuery
} = userApi;
