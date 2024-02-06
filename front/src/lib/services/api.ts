// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
;
import { RootState } from '@/lib/services/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUserCookie } from '../helpers/UserHelper';
import { UserCookieType } from '@/types/User';

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  tagTypes: [
    "Me",
    "Companies"
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const session = await getUserCookie(UserCookieType.SESSION);
      const parsedSession = JSON.parse(session?.value || "{}");
      if(parsedSession?.token) headers.set('Authorization', `Bearer ${parsedSession?.token}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
  refetchOnFocus: true,
});

export default api;
