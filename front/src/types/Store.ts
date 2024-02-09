import { Company } from "./Company";
import { HydraResp } from "./HydraPaginateResp";
import { Service } from "./Service";
import { Employee } from "./User";
import { User } from "./User";

export type Store = HydraResp<{
    id: number;
    name: string;
    address: string;
    postalCode: string;
    country: string;
    city: string;
    latitude: number;
    longitude: number;
    services: Service[];
    users: User[];
    company: Company;
}>

type StoreFlatten = Paths<Omit<Store, 'services' | 'users'| 'company'> & { services: Service }>

export type QueryStore = Partial<Record<keyof Store, string>> & Record<StoreFlatten, string | undefined>