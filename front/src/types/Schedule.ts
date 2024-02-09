import { HydraResp } from "./HydraPaginateResp";
import { User } from "./User";

export type Schedule = HydraResp<{
    "id": 0,
    "startDate": "2024-02-08T21:54:16.480Z",
    "endDate": "2024-02-08T21:54:16.480Z",
    "onVacation": true,
    "employee": HydraResp<Pick<User, "email">>,
    "store": "https://example.com/"
}>