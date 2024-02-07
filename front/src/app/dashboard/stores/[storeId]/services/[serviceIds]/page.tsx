"use client";

import { useState, useEffect } from 'react';

export default function Stores({ params }: { params: { storeId: string } }) {
    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                    {
                        store ? (
                            <section>
                                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 text-center">
                                        {store.name}
                                    </h2>
                                    <p className="text-center">{store.address}, {store.postalCode} {store.city}, {store.country}</p>

                                    <div className="max-w-screen-xl px-4 py-4 mx-auto text-center lg:py-8 lg:px-6">
                                        <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-2 dark:text-white">
                                            <div className="flex flex-col items-center justify-center">
                                                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{store.users.length}</dt>
                                                <dd className="font-light text-gray-500 dark:text-gray-400">Employees</dd>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{store.services.length}</dt>
                                                <dd className="font-light text-gray-500 dark:text-gray-400">Services</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>

                                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border mt-4">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 inline-block">
                                        Employees
                                    </h2>
                                    <a href={`/dashboard/stores/${params.storeId}/employees`} className="text-blue-500 dark:text-blue-400 hover:underline">See all</a>

                                    <div className="max-w-screen-xl px-4 py-4 mx-auto text-center lg:py-8 lg:px-6">
                                        {
                                            store.users.length > 1 ? (store.users.map((user, index) => (
                                                <div key={index} className="flex flex-col items-center justify-center">
                                                    <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{user.firstname}</dt>
                                                    <dd className="font-light text-gray-500 dark:text-gray-400">{user.email}</dd>
                                                </div>
                                            ))) : (
                                                <div>
                                                    <p className="text-center">No employees found</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border mt-4">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 inline-block">
                                        Services
                                    </h2>
                                    <a href={`/dashboard/stores/${params.storeId}/employees`} className="text-blue-500 dark:text-blue-400 hover:underline">See all</a>

                                    <div className="max-w-screen-xl mx-auto text-center">
                                        {
                                            store.services.length > 1 ? (store.services.map((service) => (
                                                <a href={`/dashboard/employees/${service.id}`} key={service.id}>
                                                    <li key={service.id} className="flex justify-between gap-x-6 py-5 hover:bg-gray-100 w-full rounded shadow">
                                                        <div className="min-w-0 flex flex-auto items-center justify-between px-6">
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{service.name}</p>
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{service.price}</p>
                                                        </div>
                                                    </li>
                                                </a>
                                            ))) : (
                                                <div>
                                                    <p className="text-center">No employees found</p>
                                                </div>
                                            )
                                        }
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
