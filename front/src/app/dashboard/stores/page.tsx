"use client";

import { Store } from "@/types/Store";
import { Button } from "@/components/Ui/Button";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { selectCurrentUser } from "@/lib/services/slices/authSlice";

export default function Stores() {
    const [stores, setStores] = useState<Store[]>([]);

    const user = useSelector(selectCurrentUser);
    console.log(user)

    useEffect(() => {
        if (user) {
            fetch(`https://api.odicylens.com/companies/${1}`, { method: "GET" })
                .then((res) => res.json())
                .then((data) => { setStores(data.stores) });
        }
    }, [user]);


    // useEffect(() => {
    //     if ((cookies as any).session) {
    //         fetch(`https://api.odicylens.com/companies/${1}`, { method: "GET" }) // TODO: Replace with companyId of the current user
    //             .then((res) => res.json())
    //             .then((data) => { setStores(data.stores) });
    //     }
    // }, [cookies]);

    const handlePagination = (page: number) => {

    }

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">

                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    {
                        stores ? (
                            <div>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 inline">Your Stores</h2>
                                    <Button intent="default" className="mb-8 mr-4">Add a new store</Button>
                                </div>
                                    <ul>
                                        {
                                            stores.map((store, index) => (
                                                <li key={store.id} className="flex justify-between gap-x-6 py-5 px-4 rounded hover:bg-gray-100 transition-colors">
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-lg font-semibold leading-6 text-gray-900">{store.name}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{store.address}, {store.postalCode} {store.city}, {store.country}</p>
                                                        </div>
                                                    </div>
                                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <a href={"/dashboard/stores/" + store.id} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 mt-2">
                                                            Link to Store
                                                        </a>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                            </div>
                        ) : (
                            <div className="grid place-items-center">
                                <h1 className="text-9xl mb-8">
                                    🤝
                                </h1>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                                    You are not associated with any company yet
                                </h2>
                                <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Become an affiliate</a>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
