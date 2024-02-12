import { Store } from "./Store"
import { Owner } from "./User"

export type Company = {
    id: number,
    name: string,
    kbis: string,
    isValid: boolean,
    stores: Store[],
    owner: Owner,
    refused: boolean
}