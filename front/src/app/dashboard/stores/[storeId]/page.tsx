"use client";

import { Store } from "@/types/Store";
import { useState, useEffect } from 'react';

// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "@/lib/services/slices/authSlice";

export default function Stores({ params }: { params: { storeId: string } }) {

    // const user = useSelector(selectCurrentUser);
    // console.log(user)

    const [store, setStore] = useState<Store | null>(null);
    useEffect(() => {
        fetch(`https://api.odicylens.com/stores/${params.storeId}`)
            .then(response => response.json())
            .then(data => setStore(data))
    }, [params.storeId]);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    {
                        store ? (
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 inline">
                                    {store.name}
                                </h2>
                                <p>{store.address}, {store.postalCode} {store.city}, {store.country}</p>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 inline">
                                    Loading...
                                </h2>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
