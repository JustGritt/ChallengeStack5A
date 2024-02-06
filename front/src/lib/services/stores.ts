import api from "./api";
import { HydraPaginateResp } from "@/types/HydraPaginateResp";
import { QueryStore, Store } from "@/types/Store";
import { createQueryParams } from "../utils";

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
  }),
  overrideExisting: true,
});

export const {
  useGetAllStoresQuery,
  useLazyGetAllStoresQuery
} = storesApi;
