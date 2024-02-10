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
        createBooking: build.mutation<Booking, BooKingPost>({
            query: (body) => ({
                url: `/bookings`,
                method: "POST",
                body
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useLazyGetEmployeeBookingsQuery,
    useCreateBookingMutation
} = bookingsApi;
