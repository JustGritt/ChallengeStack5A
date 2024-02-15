"use client";

import Link from "next/link";
import Breadcrumb from "@/components/Header/Breadcrumb";

import { Store } from "@/types/Store";
import { useSelector } from "react-redux";
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { useState, useEffect } from 'react';
import { selectCurrentUserConfig } from "@/lib/services/slices/authSlice";

export default function Stores() {

    // Get session
    const userConfig: { [key: string]: boolean } = useSelector(selectCurrentUserConfig);
    const [parsedSession, setParsedSession] = useState<any>({});
    useEffect(() => {
        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            const parsedSession = JSON.parse(session?.value || "{}");
            setParsedSession(parsedSession);
        })();
    }, [userConfig])

    const [store, setStore] = useState<Store | null>(null);
    useEffect(() => {
        if(parsedSession?.user?.work?.id) {
            fetch(`https://api.odicylens.com/stores/${parsedSession?.user?.work?.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${parsedSession?.token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setStore(data)
                });
        }
    }, [parsedSession?.token, parsedSession?.user?.work?.id]);

    return (
        <section>
            <Breadcrumb />
            {
                store ? (
                    <section className="mt-4">
                        <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                                    {store.name}
                                </h2>
                                <p className="mr-4">{store.address}, {store.postalCode} {store.city}, {store.country}</p>
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
                                    Employees ({store.users.length})
                                </h2>
                                <div className="flex items-center justify-between gap-4">
                                    <Link href={`/dashboard/stores/${parsedSession?.user?.work?.id}/employees`} className="text-sm font-medium rounded-lg disabled:pointer-events-none disabled:opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-10 px-4 py-2">
                                        See all
                                    </Link>
                                </div>
                            </div>

                            <div className="mx-auto lg:pt-8">
                                <ul className="bg-white dark:bg-gray-700 rounded-xl flex flex-col gap-4">
                                    {
                                        store.users.length === 0 ? (
                                            <p>No employees yet</p>
                                        ) : (
                                            store.users.slice(0, 3).map((user, index) => (
                                                <a href={`/dashboard/stores/${store?.id}/employees/${user.id}`} key={user.id}>
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
                                    Services ({store.services.length})
                                </h2>

                                <div className="flex items-center justify-between gap-4">
                                    <Link href={`/dashboard/stores/${parsedSession?.user?.work?.id}/services`} className="text-sm font-medium rounded-lg disabled:pointer-events-none disabled:opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-10 px-4 py-2">
                                        See all
                                    </Link>
                                </div>
                            </div>

                            <div className="mx-auto lg:pt-8">
                                <ul className="flex flex-col gap-4">
                                    {
                                        store.services.length > 1 ? (store.services.slice(0, 3).map((service) => (
                                            <a href={`/dashboard/stores/${parsedSession?.user?.work?.id}/services/${service.id}`} key={service.id}>
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
                                <Link href="/login" className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Go back
                                </Link>
                            </div>
                        </div>
                    </section>
                )
            }
        </section>
    )
}
