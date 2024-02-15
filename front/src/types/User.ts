import { Company } from "./Company"
import { Store } from "./Store"
import { use } from 'react';

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
    work?: Store,
    companie?: Company
}

export enum UserCookieType {
    SESSION = "session",
}

export type UserRegister = {
    firstname: string
    email: string
    confirmPassword: string
    plainPassword: string,
    terms: boolean
}

export type UserLogin = {
    email: string
    password: string
}

export type UserUpdateProfile = {
    firstname: string
}

export type UserForgetPassword = {
    email: string
}

export type UserPassword = {
    confirmPassword: string
    plainPassword: string,
}

export type Owner = {
    id: number,
    email: string,
}

export type Employee = {
    id: number,
    email: string,
    firstname: string,
    work: Store,
    company: Company,
    isValid: boolean,
}