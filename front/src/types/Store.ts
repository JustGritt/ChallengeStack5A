import { Company } from "./Company";
import { Service } from "./Service";
import { Employee } from "./User";
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

type StoreFlatten = Paths<Omit<Store, 'services' | 'users'| 'company'> & { services: Service }>

// type StoreFlatten = Paths<Omit<Store, 'services'> & { services: Service }>
// type StoreFlatten = "id" | "name" | "address" | "postalCode" | "country" | "city" | "latitude" | "longitude" | "services" | "users"
export type QueryStore = Omit<Partial<Record<keyof Store, string>>, "services"> & Record<StoreFlatten, string | undefined>