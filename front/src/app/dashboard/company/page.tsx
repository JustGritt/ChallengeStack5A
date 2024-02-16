"use client";

import Link from 'next/link';
import { Company } from "@/types/Company";
import { Employee } from "@/types/User";
import { useSelector } from 'react-redux';
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useEffect, useMemo, useState } from 'react';
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';
import { CheckIcon, IdentificationIcon, UserIcon, HomeModernIcon, XMarkIcon } from "@heroicons/react/20/solid";

export default function Companies() {

    type UserConfigType = {
        isAdmin: boolean;
        isWorker: boolean;
        isOwner: boolean;
        isClient: boolean;
    };

    const user = useSelector(selectCurrentUser);
    const userConfig = useSelector(selectCurrentUserConfig);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [companyInfo, setCompanyInfo] = useState<Company>();
    const [companyEmployees, setCompanyEmployees] = useState<Employee[]>([]);
    const userRoles = useMemo(() => Object.keys(userConfig || {}).filter((role) => userConfig[role as keyof UserConfigType]), [userConfig]);

    // Get session
    const [parsedSession, setParsedSession] = useState<any>({});
    useEffect(() => {
        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            const parsedSession = JSON.parse(session?.value || "{}");
            setParsedSession(parsedSession);
        })();
    }, [])

    useEffect(() => {
        const fetchCompanies = async (token: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            setCompanies(data['hydra:member']);
        };

        const fetchCompanyInfo = async (token: string, companyId: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${companyId}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            setCompanyInfo(data);
        };

        const fetchCompanyEmployees = async (token: string, companyId: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/${companyId}/employee`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            setCompanyEmployees(data);
        }

        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            const parsedSession = JSON.parse(session?.value || '{}');

            if (userConfig.isAdmin && parsedSession.token) {
                fetchCompanies(parsedSession.token);
            }

            if (userConfig.isOwner && parsedSession.token && parsedSession.user?.companie?.id) {
                fetchCompanyInfo(parsedSession.token, parsedSession.user.companie.id);
                fetchCompanyEmployees(parsedSession.token, parsedSession.user.companie.id);
            }
        })();
    }, [user, userConfig]);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    { // Owner with company
                        (userRoles.includes('isOwner') && user?.companie) && (
                            <section>
                                {
                                    companyInfo ? (
                                        <section className="bg-white dark:bg-gray-900">
                                            <div className="w-full mb-8 lg:mb-16 grid grid-cols-2 gap-4">
                                                <div>
                                                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{companyInfo.name}</h2>
                                                    {
                                                        companyInfo.refused ? (
                                                            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                                                <XMarkIcon className="w-5 h-5 mr-1" />
                                                                Refused
                                                            </span>
                                                        ) : (
                                                            companyInfo.isValid ? (
                                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    <CheckIcon className="w-5 h-5 mr-1" />
                                                                    Validated
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                                                    <XMarkIcon className="w-5 h-5 mr-1" />
                                                                    Not validated
                                                                </span>
                                                            )
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                                                <div>
                                                    <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                        <IdentificationIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                        Company ID
                                                    </h3>
                                                    <p className="text-gray-500 dark:text-gray-400">
                                                        {user?.companie?.id}
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
                                                        {companyInfo.adresse}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                        <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                        KBIS
                                                    </h3>
                                                    <p className="text-gray-500 dark:text-gray-400">
                                                        {companyInfo.kbis}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                        <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                        RCS
                                                    </h3>
                                                    <p className="text-gray-500 dark:text-gray-400">
                                                        {companyInfo.rcs}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                        <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                        Capital
                                                    </h3>
                                                    <p className="text-gray-500 dark:text-gray-400">
                                                        {companyInfo.capital}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                        <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                        Structure
                                                    </h3>
                                                    <p className="text-gray-500 dark:text-gray-400">
                                                        {companyInfo.structure}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                        <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                        Registration Date
                                                    </h3>
                                                    <p className="text-gray-500 dark:text-gray-400">
                                                        {companyInfo.registrationDate.split('T')[0]}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h3 className="mb-2 text-xl font-bold dark:text-white flex justify-start items-center">
                                                        <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 inline mr-2" />
                                                        Owner Address
                                                    </h3>
                                                    <p className="text-gray-500 dark:text-gray-400">
                                                        {companyInfo.ownerAdresse}
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
                                                    <Link href="/dashboard/company" className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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

                    { // Admin
                        (userRoles.includes('isAdmin')) && (
                            <section>
                                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                                    List of all companies {companies.length > 0 ? `(${companies.length})` : ''}
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