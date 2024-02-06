import { Service } from "./Service";

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
}

type StoreFlatten = Paths<Omit<Store, 'services'> & { services: Service }>


export type QueryStore = Omit<Partial<Record<keyof Store, string>>, "services"> & Record<StoreFlatten, string | undefined>
