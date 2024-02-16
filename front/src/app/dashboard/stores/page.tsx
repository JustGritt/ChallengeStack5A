"use client";

import StoreDetail from "@/components/Pages/Store/StoreDetail";
import StorePagination from "@/components/Pages/Store/StorePagination";

import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { selectCurrentUserConfig } from "@/lib/services/slices/authSlice";

export default function Stores() {

    const [userRoles, setUserRoles] = useState<string[]>([]);

    // Get session
    const userConfig = useSelector(selectCurrentUserConfig);
    useEffect(() => {
        (async () => {
            setUserRoles(Object.keys(userConfig).filter(key => (userConfig as any)[key] === true))
        })();
    }, [userConfig])

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 pt-8 pb-4 rounded-xl shadow border">
                    {
                        userRoles.includes("isWorker") ? <StoreDetail /> : <StorePagination />
                    }
                </div>
            </div>
        </section>
    )
}