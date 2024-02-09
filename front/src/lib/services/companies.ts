import api from "./api";
import { HydraPaginateResp } from "@/types/HydraPaginateResp";
import { Store } from "@/types/Store";
import { Company } from "@/types/Company";
import { createFormDataRequest } from "../utils";
import { IFilters } from "@/types/Fetch";

export const companiesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCompanies: build.query<HydraPaginateResp<Company>, IFilters>({
      query: (data) => {
        const params = createFormDataRequest(data);
        return {
          url: `/companies${params}`,
        };
      },
      providesTags: (result, _error, filters) =>
        result
          ? [
            ...result["hydra:member"].map(({ id }) => ({
              type: "Companies" as const,
              id,
            })),
            { type: "Companies", id: "LIST", ...filters },
          ]
          : [],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetCompaniesQuery
} = companiesApi;
