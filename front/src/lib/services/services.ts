import api from "./api";
import { HydraPaginateResp } from "@/types/HydraPaginateResp";
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
  }),
  overrideExisting: true,
});

export const {
  useLazyGetServicesQuery
} = servicesApi;
