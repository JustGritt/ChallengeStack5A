"use client";

import Link from "next/link";
import DashboardStat from '@/components/Dashboard/DashboardStat';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CalendarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';

export default function Company() {

    const user = useSelector(selectCurrentUser);
    console.log(user)

    const userConfig = useSelector(selectCurrentUserConfig);
    const [userRoles, setUserRoles] = useState<any[]>([]);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    {
                        user?.companie ? (
                            <section>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                                        {user?.companie.name}
                                    </h3>

                                    <Link href="/dashboard/company/edit" className="text-sm font-medium rounded-lg disabled:pointer-events-none disabled:opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-10 px-4 py-2">Edit</Link>
                                </div>
                                <DashboardStat />
                            </section>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                                    Your Company
                                </h2>
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                    You don&apos;t have a company yet
                                </h3>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    You can create a company in the settings
                                </p>
                            </div>
                        )
                    }

                </div>
            </div>
        </section>
    )
}
