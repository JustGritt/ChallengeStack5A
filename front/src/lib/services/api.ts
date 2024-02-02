// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
;
import { RootState } from '@/lib/services/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  tagTypes: [
    "Me"
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      // const token = (getState() as RootState).auth.token;
      // if (token && endpoint !== 'downloadCompanyFile') {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }

      return headers;
    },
  }),
  endpoints: () => ({}),
  refetchOnFocus: true,
});

export default api;
