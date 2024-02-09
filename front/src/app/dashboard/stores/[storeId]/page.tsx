"use client";

import { Store } from "@/types/Store";
import { useState, useEffect } from 'react';

export default function Stores({ params }: { params: { storeId: string } }) {

    const [store, setStore] = useState<Store | null>(null);
    useEffect(() => {
        fetch(`https://api.odicylens.com/stores/${params.storeId}`)
            .then(response => response.json())
            .then(data => setStore(data));
    }, [params.storeId]);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                    {
                        store ? (
                            <section>
                                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                                            {store.name}
                                        </h2>
                                        <p className="text-center">{store.address}, {store.postalCode} {store.city}, {store.country}</p>
                                    </div>

                                    <div className=" flex justify-end items-end mt-4 gap-8">
                                        <div className="flex flex-col items-center justify-center">
                                            <strong className="mb-2 text-3xl md:text-4xl font-extrabold">{store.users.length}</strong>
                                            <span className="font-light text-gray-500 dark:text-gray-400">Employees</span>
                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            <strong className="mb-2 text-3xl md:text-4xl font-extrabold">{store.services.length}</strong>
                                            <span className="font-light text-gray-500 dark:text-gray-400">Services</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border mt-4">

                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 inline-block">
                                            Employees
                                        </h2>
                                        <div className="flex items-center justify-between gap-4">
                                            <a href={`/dashboard/stores/${params.storeId}/employees/add`} className="text-sm font-medium rounded-lg disabled:pointer-events-none disabled:opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-10 px-4 py-2">
                                                New Employee
                                            </a>
                                        </div>
                                    </div>

                                    <div className="max-w-screen-xl mx-auto lg:pt-8">
                                        <ul className="bg-white dark:bg-gray-700 rounded-xl flex flex-col gap-4">
                                            {
                                                store.users.length === 0 ? (
                                                    <p>No employees yet</p>
                                                ) : (
                                                    store.users.map((user) => (
                                                        <a href={`/dashboard/employees/${user.id}`} key={user.id}>
                                                            <li className="flex justify-between gap-6 w-full rounded px-4 hover:bg-gray-100 shadow">
                                                                <div className="flex min-w-0 gap-4 py-4">
                                                                    <div className="h-12 w-12 flex-none rounded-full bg-gray-200 grid place-items-center font-bold">{user.firstname.charAt(0)}</div>
                                                                    <div className="min-w-0 flex-auto">
                                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{user.firstname}</p>
                                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </a>
                                                    ))
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>

                                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border mt-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 inline-block">
                                            Services
                                        </h2>

                                        <div className="flex items-center justify-between gap-4">
                                            <a href={`/dashboard/stores/${params.storeId}/services`} className="text-sm font-medium rounded-lg disabled:pointer-events-none disabled:opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-10 px-4 py-2">
                                                New Service
                                            </a>
                                        </div>
                                    </div>

                                    <div className="max-w-screen-xl mx-auto lg:pt-8">
                                        <ul className="flex flex-col gap-4">
                                            {
                                                store.services.length > 1 ? (store.services.map((service) => (
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
                                                        <p className="text-center">No employees found</p>
                                                    </div>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 inline">
                                    Loading...
                                </h2>
                            </div>
                        )
                    }
            </div>
        </section>
    )
}
