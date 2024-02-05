import { Company } from "./Company"
import { Store } from "./Store"

export type UserRegister = {
    firstname: string
    email: string
    confirmPassword: string
    plainPassword: string,
    terms: boolean
}

export enum UserCookieType {
    SESSION = "session",
}


type UserROLES = "ROLE_ADMIN" | "ROLE_USER" | "ROLE_SUPER_ADMIN"

export type User = {
    "@context": string,
    "@id": string,
    "@type": string,
    id: number,
    email: string,
    roles: Array<UserROLES>,
    firstname: string,
    isValid: boolean,
    work: Store,
    companie: Company
}


export type UserLogin = {
    email: string
    password: string
}
