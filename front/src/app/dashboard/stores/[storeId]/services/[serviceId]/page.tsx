"use client";

import Link from "next/link";
import Breadcrumb from "@/components/Header/Breadcrumb";
import { useEffect, useState } from 'react';
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";

export default function Stores({ params }: { params: { storeId: string, serviceId: string } }) {

    // Get session
    const [parsedSession, setParsedSession] = useState<any>({});
    useEffect(() => {
        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            const parsedSession = JSON.parse(session?.value || "{}");
            setParsedSession(parsedSession);
        })();
    }, [])

    const [services, setservices] = useState<any[]>([]);
    useEffect(() => {
        if(parsedSession?.token) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${params.storeId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${parsedSession?.token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setservices(data.services);
                });
        }
    }, [params.storeId, params.serviceId, parsedSession?.token]);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <Breadcrumb />
                    {
                        services ? (
                            <section className="mt-4">
                                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 text-center">
                                        Service {params.serviceId}
                                    </h2>
                                    <p className="text-center">
                                        Details of service {params.serviceId}
                                    </p>
                                    {
                                        services.map((service) => (
                                            service.id === Number(params.serviceId) ? (
                                                <div key={service.id} className="flex justify-between gap-x-6 py-5 hover:bg-gray-100 w-full rounded shadow">
                                                    <div className="min-w-0 flex flex-auto items-center justify-between px-6">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{service.name}</p>
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{service.price} €</p>
                                                    </div>
                                                </div>
                                            ) : null
                                        ))
                                    }
                                </div>

                                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border mt-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 inline-block">
                                            Other Services
                                        </h2>

                                        <div className="flex items-center justify-between gap-4">
                                            <Link href={`/dashboard/stores/${params.storeId}/services/add`} className="text-sm font-medium rounded-lg disabled:pointer-events-none disabled:opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-10 px-4 py-2">
                                                New Service
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="mx-auto lg:pt-8">
                                        {
                                            services.slice(0,5).map((service) => (
                                                <Link href={`/dashboard/stores/${params.storeId}/services/${service.id}`} key={service.id} className="mt-2 block">
                                                    <div key={service.id} className="flex justify-between gap-x-6 py-5 hover:bg-gray-100 w-full rounded shadow">
                                                        <div className="min-w-0 flex flex-auto items-center justify-between px-6">
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{service.name}</p>
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{service.price} €</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                        }
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
                                        We are fetching the services for you.
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
