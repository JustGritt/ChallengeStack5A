import { Company } from "./Company";
import { Service } from "./Service";
import { User } from "./User";

export type Store = {
    "@context": string;
    "@id": string;
    "@type": string;
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
}

export type NewStore = Omit<Store, 'id' | '@id' | '@context' | '@type' | 'services' | 'users' | 'company'>

type StoreFlatten = Paths<Omit<Store, 'services' | 'users'| 'company'> & { services: Service }>

export type QueryStore = Partial<Record<keyof Store, string>> & Record<StoreFlatten, string | undefined>