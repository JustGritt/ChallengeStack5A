import api from "./api";
import { HydraPaginateResp, HydraResp } from "@/types/HydraPaginateResp";
import { BooKingPost, Booking } from "@/types/Booking";

export const bookingsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getEmployeeBookings: build.query<HydraPaginateResp<Booking>, string>({
            query: (id) => {
                return {
                    url: `/employee/${id}/bookings`,
                    headers: {
                        "content-type": "application/json"
                    },
                };
            },
            extraOptions: {
                fetchPolicy: 'no-cache',
            },
            providesTags: (result, _error, filters) =>
                result
                    ? [
                        ...result['hydra:member'].map(({ id }) => ({
                            type: "Bookings" as const,
                            id,
                        })),
                        { type: "Bookings", id: "LIST" },
                    ]
                    : [],
        }),
        getStoreBookings: build.query<HydraPaginateResp<Booking>, string>({
            query: (id) => {
                return {
                    url: `/stores/${id}/bookings`,
                    headers: {
                        "content-type": "application/json"
                    },
                };
            },
            extraOptions: {
                fetchPolicy: 'no-cache',
            },
            providesTags: (result, _error, filters) =>
                result
                    ? [
                        ...result['hydra:member'].map(({ id }) => ({
                            type: "StoreBookings" as const,
                            id,
                        })),
                        { type: "StoreBookings", id: "LIST" },
                    ]
                    : [],
        }),
        createBooking: build.mutation<Booking, BooKingPost>({
            query: (body) => ({
                url: `/bookings`,
                method: "POST",
                body
            }),
            invalidatesTags: [{ type: "StoreBookings" }, { type: "Bookings" }],
        }),
    }),
    overrideExisting: true,
});

export const {
    useLazyGetEmployeeBookingsQuery,
    useCreateBookingMutation,
    useLazyGetStoreBookingsQuery,
    useGetStoreBookingsQuery
} = bookingsApi;
