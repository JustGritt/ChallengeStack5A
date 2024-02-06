"use server"

import { UserCookieType } from "@/types/User";
import { cookies } from "next/headers";



export const setUserCookie = async (cookie: UserCookieType, value: string) => {
    const expires = new Date(Date.now() + 60 * 60 * 24 * 7)
    await cookies().set({
        name: UserCookieType.SESSION,
        value: value,
        expires
    })
}

export const removeUserCookie = (cookie: UserCookieType) => {
    cookies().delete(cookie);
}

export const getUserCookie =  (cookie: UserCookieType) => {
    return  cookies().get(cookie);
}