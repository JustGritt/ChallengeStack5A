import { HydraResp } from "./HydraPaginateResp";
import { Service } from "./Service";
import { User } from "./User";

export interface Booking {
    "@id": string;
    "@type": string;
    "@context": string;
    id: number;
    customer: HydraResp<Pick<User, "email">>;
    employee: HydraResp<Pick<User, "email">>;
    service: HydraResp<Pick<Service, "name">>;
    startDate: string;
    endDate: string;
    amount: number;
}

export type BooKingPost = {
    employee: string,//"users/1"
    service: string,//"services/1"
    startDate: string,
    amount: number
}