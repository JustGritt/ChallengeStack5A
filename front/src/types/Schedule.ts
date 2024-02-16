import { HydraResp } from "./HydraPaginateResp";
import { User } from "./User";

export type Schedule = HydraResp<{
    "id": number,
    "startDate": string,
    "endDate": string,
    "onVacation": boolean,
    refused: boolean | null,
    "employee": HydraResp<Pick<User, "email" | "id">>,
    "store": string
}>

export type AvailableSchedule = {
    "startDate": string,
    "endDate": string,
    "employee": HydraResp<Pick<User, "email" | "id">>,
}