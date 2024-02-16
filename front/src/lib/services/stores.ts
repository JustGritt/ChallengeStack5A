import api from "./api";
import { HydraPaginateResp } from "@/types/HydraPaginateResp";
import { CreateStore, CreateStoreSend, QueryStore, Store } from "@/types/Store";
import { createQueryParams } from "../utils";
import { AvailableSchedule, Schedule } from "@/types/Schedule";

export const storesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllStores: build.query<HydraPaginateResp<Store>, void | Partial<QueryStore>>({
      query: (data) => {
        const params = createQueryParams(data ?? {});
        return {
          url: `/stores${data ? `?${params}` : ''}`,
        };
      },
      providesTags: (result, _error, filters) =>
        result
          ? [
            ...result['hydra:member'].map(({ id }) => ({
              type: "Stores" as const,
              id,
            })),
            { type: "Stores", id: "LIST", ...filters },
          ]
          : [],
    }),
    getStore: build.query<Store, string>({
      query: (id) => {
        return {
          url: `/stores/${id}`,
        };
      },
      providesTags: (result, _error, id) => [{ type: "Stores", id }],
    }),
    getStoreSchedules: build.query<HydraPaginateResp<Schedule>, string>({
      query: (idStore) => {
        return {
          url: `/stores/${idStore}/schedules`,
        };
      },
      providesTags: (result, _error, filters) =>
        result
          ? [
            ...result['hydra:member'].map(({ id }) => ({
              type: "StoreSchedules" as const,
              id,
            }))
          ]
          : [],
    }),
    getStoreFreeSchedules: build.query<Array<AvailableSchedule>, string>({
      query: (idStore) => {
        return {
          url: `/stores/${idStore}/free-time`,
        };
      }
    }),
    addStore: build.mutation<CreateStoreSend, Partial<Store>>({
      query: (data) => {
        return {
          url: "/stores",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Stores", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllStoresQuery,
  useLazyGetAllStoresQuery,
  useGetStoreQuery,
  useLazyGetStoreQuery,
  useGetStoreSchedulesQuery,
  useLazyGetStoreSchedulesQuery,
  useAddStoreMutation,
  useLazyGetStoreFreeSchedulesQuery,
  useGetStoreFreeSchedulesQuery,
} = storesApi;
