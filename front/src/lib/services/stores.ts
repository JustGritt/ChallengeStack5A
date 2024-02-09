import api from "./api";
import { HydraPaginateResp } from "@/types/HydraPaginateResp";
import { QueryStore, Store } from "@/types/Store";
import { createQueryParams } from "../utils";
import { Schedule } from "@/types/Schedule";

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
    getStoresSchedules: build.query<HydraPaginateResp<Schedule>, string>({
      query: (idStore) => {
        return {
          url: `/stores/${idStore}/schedules`,
        };
      },
      providesTags: (result, _error, filters) =>
        result
          ? [
            ...result['hydra:member'].map(({ id }) => ({
              type: "Stores" as const,
              id,
            })),
            { type: "Stores", id: "LIST" },
          ]
          : [],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllStoresQuery,
  useLazyGetAllStoresQuery,
  useGetStoreQuery,
  useLazyGetStoreQuery,
  useGetStoresSchedulesQuery
} = storesApi;
