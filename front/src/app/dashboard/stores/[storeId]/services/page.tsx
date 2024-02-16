"use client";

import Link from "next/link";
import Breadcrumb from "@/components/Header/Breadcrumb";
import { Store } from "@/types/Store";
import { useState, useEffect } from 'react';
import { selectCurrentUserConfig } from "@/lib/services/slices/authSlice";
import { useSelector } from "react-redux";

export default function EditStoreServices({ params }: { params: { storeId: string } }) {

    const userConfig = useSelector(selectCurrentUserConfig);

    const [store, setStore] = useState<Store | null>(null);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${params.storeId}`)
            .then(response => response.json())
            .then(data => setStore(data));
    }, [params.storeId]);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <Breadcrumb />
                {
                    store ? (
                        <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border mt-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 inline-block">
                                    Services
                                </h2>

                                <div className="flex items-center justify-between gap-4">
                                    {
                                        (userConfig.isOwner || userConfig.isAdmin) && (
                                            <Link href={`/dashboard/stores/${params.storeId}/services/add`} className="text-sm font-medium rounded-lg disabled:pointer-events-none disabled:opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-10 px-4 py-2">
                                                New Service
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="mx-auto lg:pt-8">
                                <ul className="flex flex-col gap-4">
                                    {
                                        store.services.length > 0 ? (store.services.map((service) => (
                                            <a href={`/dashboard/stores/${params.storeId}/services/${service.id}`} key={service.id}>
                                                <li key={service.id} className="flex justify-between gap-x-6 py-5 hover:bg-gray-100 w-full rounded shadow">
                                                    <div className="min-w-0 flex flex-auto items-center justify-between px-6">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{service.name}</p>
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{service.price} €</p>
                                                    </div>
                                                </li>
                                            </a>
                                        ))) : (
                                            <div>
                                                <p className="text-center">No services found</p>
                                            </div>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <section className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                            <div className="text-center">
                                <h1 className="text-9xl mb-8 animate-bounce">
                                    🏃
                                </h1>
                                <strong className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                    Loading...
                                </strong>
                                <p className="mt-6 text-base leading-7 text-gray-600">
                                    We are fetching the store data
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6 flex-col">
                                    Taking too long?
                                    <Link href="/dashboard" className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        Go back
                                    </Link>
                                </div>
                            </div>
                        </section>
                    )
                }
            </div>
        </section>
    )
}
