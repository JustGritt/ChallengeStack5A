import { HydraResp } from "./HydraPaginateResp";
import { User } from "./User";

export type Schedule = HydraResp<{
    "id": number,
    "startDate": string,
    "endDate": string,
    "onVacation": boolean,
    "employee": HydraResp<Pick<User, "email">>,
    "store": string
}>