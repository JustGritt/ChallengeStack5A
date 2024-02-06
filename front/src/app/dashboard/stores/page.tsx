"use client";
import { useState, useEffect } from 'react';
import { Company } from "@/types/Company";
import { useCookies } from "react-cookie";
import { useGetMyProfileQuery, useLazyGetMyProfileQuery } from "@/lib/services/auth";

export default function Stores() {
    const [stores, setStores] = useState<Company[]>([]);
    const [cookies, _, removeCookie] = useCookies(["yoken"]);
    const [getMyProfileAsync, { isError, isLoading, data: user }] = useLazyGetMyProfileQuery();

    useEffect(() => {
        (async () => {
            try {
                if (!user) {
                    const token = cookies.yoken;

                    if (!token) {
                        throw new Error("No token");
                    }
                    await getMyProfileAsync(token).unwrap();
                }
            } catch (e) {
                removeCookie("yoken", { path: "/" });
            }
        })();
    }, [cookies.yoken, getMyProfileAsync, removeCookie, user]);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">

            </div>
        </section>
    )
}
