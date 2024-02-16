// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUserCookie } from '../helpers/UserHelper';
import { UserCookieType } from '@/types/User';

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  tagTypes: [
    "Me",
    "Companies",
    "Services",
    "Stores",
    "Bookings",
    "UserSchedules",
    "StoreSchedules",
    "StoreBookings"
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers, { getState, endpoint, extra }) => {
      const session = await getUserCookie(UserCookieType.SESSION);
      if (session?.token) headers.set('Authorization', `Bearer ${session?.token}`);
      headers.set("Content-Type", "application/json");
      console.log(extra)
      return headers;
    },
  }),
  endpoints: () => ({}),
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true
});

export default api;
