"use server"
import { AnyObject } from './../../types/Fetch';

import { UserCookieType } from "@/types/User";
import { cookies } from "next/headers";



export const setUserCookie = async (cookie: UserCookieType = UserCookieType.SESSION, value: AnyObject) => {
    const expires = new Date(Date.now() + 60 * 60 * 24 * 7)
    const userCookies = await getUserCookie(cookie)
    const keyObject = Object.keys(value)[0]
    let cookieValue = ""
    if (Object.hasOwn(userCookies, keyObject)) {
        delete userCookies[keyObject]
    }
    const newCookie = {
        ...userCookies,
        ...value
    }
    cookieValue = JSON.stringify(newCookie)
    await cookies().set({
        name: UserCookieType.SESSION,
        value: cookieValue,
        expires
    })
}

export const removeKeyCookie = async (key: string) => {
    const expires = new Date(Date.now() + 60 * 60 * 24 * 7)
    const userCookies = await getUserCookie(UserCookieType.SESSION)
    if (Object.hasOwn(userCookies, key)) {
        delete userCookies[key]
        const cookieValue = JSON.stringify(userCookies)
        await cookies().set({
            name: UserCookieType.SESSION,
            value: cookieValue,
            expires
        })
    }
}

export const removeUserCookie = (cookie: UserCookieType) => {
    cookies().delete(cookie);
}

export const getUserCookie = async (cookie: UserCookieType = UserCookieType.SESSION) => {
    const session = await cookies().get(cookie);
    const parsedSession = JSON.parse(session?.value || "{}") as AnyObject;
    return parsedSession;
}