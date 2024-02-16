import { Company } from "./Company"
import { Store } from "./Store"
import { use } from 'react';

export enum USER_ROLES {
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_USER = "ROLE_USER",
    ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN"
}

export type User = {
    "@context": string,
    "@id": string,
    "@type": string,
    id: number,
    email: string,
    roles: Array<USER_ROLES>,
    firstname: string,
    isValid: boolean,
    work?: Store,
    companie?: Company
}

export type CompanyRequestType = {
    name: string,
    kbis: string,
    rcs: string,
    capital: number,
    adresse: string,
    structure: string,
    registrationDate: Date,
    firstname: string,
    lastname: string,
    birthday: Date,
    birthdayPlace: string,
    ownerAdresse: string,
    endDuration: Date,
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