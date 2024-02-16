import { Company } from "./Company";
import { HydraResp } from "./HydraPaginateResp";
import { Service } from "./Service";
import { User } from "./User";
import type { AddressAutofillSuggestion, AddressAutofillFeatureSuggestion } from "@mapbox/search-js-core/dist/autofill/types.d.ts";
import type { LngLatBoundsLike } from "@mapbox/search-js-core/dist/LngLatBounds";

export type Store = HydraResp<{
    id: number;
    name: string;
    address: string;
    postalCode: string;
    description: string;
    country: string;
    city: string;
    latitude: number;
    longitude: number;
    services: Service[];
    users: User[];
    company: Company;
}>

export type NewStore = Omit<Store, 'id' | '@id' | '@context' | '@type' | 'services' | 'users' | 'company'>

export type CreateStore = Pick<Store, 'name' | 'country' | 'city' | 'postalCode' | 'address'| 'description'> & { 
    coordinates?: { latitude: number, longitude: number }
}

export type CreateStoreSend = Omit<CreateStore, 'coordinates'> & {
    latitude: number;
    longitude: number;
}

type StoreFlatten = Paths<Omit<Store, 'services' | 'users' | 'company'> & { services: Service }>

export type QueryStore = Partial<Record<keyof Store, string>> & Record<StoreFlatten, string | undefined>