import { HydraResp } from "./HydraPaginateResp";
import { User } from "./User";

export interface Booking {
    "@id": string;
    "@type": string;
    "@context": string;
    id: number;
    customer: HydraResp<Pick<User, "email">>;
    employee: HydraResp<Pick<User, "email">>;
    service: {
        "@context": string;
        "@id": string;
        "@type": string;
        name: string;
    };
    startDate: string;
    endDate: string;
    store: string;
}