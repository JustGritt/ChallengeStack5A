"use client";

import Link from "next/link";
import DashboardStat from '@/components/Dashboard/DashboardStat';
import { Company } from "@/types/Company";
import { useSelector } from 'react-redux';
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react';
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';

export default function Companies() {

    const user = useSelector(selectCurrentUser);
    const userConfig: { [key: string]: boolean } = useSelector(selectCurrentUserConfig);
    const [companiesFetched, setCompaniesFetched] = useState(false);
    const [userRoles, setUserRoles] = useState<string[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            if (userConfig?.isAdmin && !companiesFetched) {
                fetch(`https://api.odicylens.com/companies`, { method: "GET" })
                    .then((res) => res.json())
                    .then((data) => setCompanies(data["hydra:member"])); // [1]
                setCompaniesFetched(true);
            }
        };

        setUserRoles(Object.keys(userConfig || {}).filter(role => userConfig[role]));
        fetchCompanies();
    }, [userConfig, companiesFetched]);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    { // Owner with company
                        (userRoles.includes('isOwner') && user?.companie) && (
                            <section>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                                        {user?.companie.name}
                                    </h3>

                                    <Link href="/dashboard/company/edit" className="text-sm font-medium rounded-lg disabled:pointer-events-none disabled:opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-10 px-4 py-2">Edit</Link>
                                </div>
                                <DashboardStat />
                            </section>
                        )
                    }

                    { // Admin
                        (userRoles.includes('isAdmin')) && (
                            <section>
                                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                                    List of all companies
                                </h3>
                                <ul role="list" className="divide-y divide-gray-100">
                                    {
                                        companies && companies.length > 0 && (
                                            companies.map((company: Company) => (
                                                <li key={company.id} className="flex justify-between gap-x-6 py-5">
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <div className="h-12 w-12 flex-none rounded-full bg-gray-50 grid place-items-center text-sm">
                                                            <ShoppingBagIcon className="h-6 w-6 text-gray-400" />
                                                        </div>
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{company.name}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{company.owner.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                        <Link href={`/dashboard/company/${company.id}`} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                            Check Company
                                                        </Link>
                                                    </div>
                                                </li>
                                            ))
                                        )
                                    }
                                </ul>
                            </section>
                        )
                    }

                    { // Owner without company
                        (userRoles.includes('isOwner') && !user?.companie) && (
                            <section>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                                        You don&apos;t have a company yet
                                    </h3>

                                    <Link href="/dashboard/company/create" className="text-sm font-medium rounded-lg disabled:pointer-events-none disabled:opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 h-10 px-4 py-2">Create</Link>
                                </div>
                            </section>
                        )
                    }
                </div>
            </div>
        </section>
    )
}