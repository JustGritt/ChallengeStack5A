"use server"
import { headers } from "next/headers";

export const getFullUrlPath = async () => {
    const headersList = headers();
    const host = await headersList.get("host"); // to get domain
    const url = await headersList.get("next-url"); // to get url

    

    return `http://${host}${url}`;
}