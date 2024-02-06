import api from "./api";
import { ApiSuccessBase } from "@/types/ApiBase";
import { LoginResponse } from "@/types/Auth";
import { User, UserRegister } from "@/types/User";
import { setCredentials } from "./slices/authSlice";
import { HydraPaginateResp } from "@/types/HydraPaginateResp";
import { Store } from "@/types/Store";

export const storesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllStores: build.mutation<HydraPaginateResp<Store>, void>({
      query: () => ({
        url: "/stores",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllStoresMutation,
} = storesApi;
