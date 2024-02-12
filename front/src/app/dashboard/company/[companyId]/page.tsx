"use client";

import Link from 'next/link';
import Breadcrumb from '@/components/Header/Breadcrumb';
import { Company } from "@/types/Company";
import { Employee } from "@/types/User";
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';
import { IdentificationIcon, UserIcon, HomeModernIcon } from "@heroicons/react/20/solid";
export default function CompanyDetails({ params }: { params: { companyId: string } }) {

    const user = useSelector(selectCurrentUser);
    const userConfig: { [key: string]: boolean } = useSelector(selectCurrentUserConfig);
    const [companyInfo, setCompanyInfo] = useState<Company>();
    const [companyEmployees, setCompanyEmployees] = useState<Employee[]>([]);

    const userRoles = useMemo(() => Object.keys(userConfig || {}).filter(role => userConfig[role]), [userConfig]);

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            const response = await fetch(`https://api.odicylens.com/companies/${params.companyId}`);
            const data = await response.json();

            if (userRoles.includes("isAdmin") || data.owner.id === user?.id) {
                setCompanyInfo(data);
            }
        };

        fetchCompanyInfo();
    }, [userRoles, user, params.companyId]);

    useEffect(() => {
        const fetchEmployees = async () => {
            if (companyInfo) {
                const allEmployees: Employee[] = [];
                const fetches = companyInfo.stores.map(async store => {
                    const response = await fetch(`https://api.odicylens.com/stores/${store.id}`);
                    const data = await response.json();
                    allEmployees.push(...data.users);
                });

                await Promise.all(fetches);
                setCompanyEmployees(allEmployees);
            }
        };

        fetchEmployees();
    }, [companyInfo]);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <Breadcrumb />
                <div className="mt-4 mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                        {
                            companyInfo ? (
                                <section className="bg-white dark:bg-gray-900">
                                    <div className="max-w-screen-md mb-8 lg:mb-16">
                                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{companyInfo.name}</h2>
                                        <p className="text-gray-500 sm:text-xl dark:text-gray-400">
                                            On this page you can find all the details about the company.
                                        </p>
                                    </div>
                                    <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                <IdentificationIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                Company ID
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                {params.companyId}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                Owner
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                {companyInfo.owner.email}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                Address
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                No data yet.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                KBIS
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                No data yet.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                RCS
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                No data yet.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                Capital
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                No data yet.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                Structure
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                No data yet.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                Registration Date
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                No data yet.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                Owner Address
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                No data yet.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                <HomeModernIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                Stores
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                {companyInfo.stores.length}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                Employees
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                {companyEmployees.length}
                                            </p>
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
                                            We are fetching the company details for you.
                                        </p>
                                        <div className="mt-10 flex items-center justify-center gap-x-6 flex-col">
                                            <strong className="text-lg font-semibold text-gray-900">Taking too long?</strong>
                                            You might not have access to this company.
                                            <Link href="/dashboard/company" className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                Go back
                                            </Link>
                                        </div>
                                    </div>
                                </section>
                            )
                        }
                </div>
            </div>
        </section>
    )
}
