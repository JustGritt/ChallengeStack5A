import api from "./api";
import { HydraPaginateResp, HydraResp } from "@/types/HydraPaginateResp";
import { createQueryParams } from "../utils";
import { IFilters } from "@/types/Fetch";
import { Service } from "@/types/Service";

export const servicesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query<HydraPaginateResp<Service>, Partial<Record<keyof Service, string>>>({
      query: (data) => {
        const params = createQueryParams(data);
        return {
          url: `/services?${params}`,
          headers: {
            "content-type": "application/json"
          },
        };
      },
      providesTags: (result, _error, filters) =>
        result
          ? [
            ...result['hydra:member'].map(({ id }) => ({
              type: "Services" as const,
              id,
            })),
            { type: "Services", id: "LIST", ...filters },
          ]
          : [],
    }),
    getStoreService: build.query<HydraResp<Service>, [string, string]>({
      query: ([idStore, idService]) => {
        return {
          url: `/stores/${idStore}/services/${idService}`,
          headers: {
            "content-type": "application/json"
          },
        };
      },
      providesTags: (_result, _error, [idStore, idService]) => [{ type: 'Services', id: idService as string }],
    }),
    deleteService: build.mutation<void, number>({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Services" }],
    }),
    patchService: build.mutation<Service, { id: string, data: Partial<Service> }>({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: data,
      }),
      extraOptions: {
        method: false,
      },
      invalidatesTags: [{ type: "Services" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetServicesQuery,
  useLazyGetStoreServiceQuery,
  useDeleteServiceMutation,
  usePatchServiceMutation,
} = servicesApi;
