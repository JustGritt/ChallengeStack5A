"use client";

import Link from 'next/link';
import Breadcrumb from '@/components/Header/Breadcrumb';
import { Company } from "@/types/Company";
import { Employee } from "@/types/User";
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';
import { CheckIcon, IdentificationIcon, UserIcon, HomeModernIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { Button } from '@/components/Ui/Button';
import toast from "react-hot-toast";

export default function CompanyDetails({ params }: { params: { companyId: string } }) {

    const user = useSelector(selectCurrentUser);
    const userConfig: { [key: string]: boolean } = useSelector(selectCurrentUserConfig);
    const [companyInfo, setCompanyInfo] = useState<Company>();
    const [companyEmployees, setCompanyEmployees] = useState<Employee[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);
    const userRoles = useMemo(() => Object.keys(userConfig || {}).filter(role => userConfig[role]), [userConfig]);

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

    const validateCompany = (id: number) => {
        fetch(`https://api.odicylens.com/companies/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                    'Authorization': `Bearer ${parsedSession?.token}`
                },
                body: JSON.stringify({ isValid: true })
            })
            .then(response => response.json())
            .then(data => { if (data.isValid) setNotifications(notifications.filter(notification => notification.id !== id)) })
    }

    const refuseCompany = (id: number) => {
        fetch(`https://api.odicylens.com/companies/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                    'Authorization': `Bearer ${parsedSession?.token}`
                },
                body: JSON.stringify({ refused: true })
            })
            .then(response => response.json())
            .then(() => {
                toast.custom((t) => (
                    <div aria-live="assertive" className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
                        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="p-4">
                                <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <CheckIcon className="w-6 h-6 text-green-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-gray-900">The company has been refused</p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        The company owner has been notified
                                    </p>
                                </div>
                                <div className="ml-4 flex flex-shrink-0">
                                    <button type="button" className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="sr-only">Close</span>
                                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                ))
            })
    }

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <Breadcrumb />
                <div className="mt-4 mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    {
                        companyInfo ? (
                            <section className="bg-white dark:bg-gray-900">
                                <div className="max-w-screen-md mb-8 lg:mb-16 grid grid-cols-2 gap-4">
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

                                    {
                                        (!companyInfo.isValid && !companyInfo.refused ) && (
                                            <div className="flex justify-end items-baseline gap-4">
                                                <Button id={`validate-company-${companyInfo.id}`} intent="default" className="inline-flex items-center" onClick={() => validateCompany(companyInfo.id)}>
                                                    <CheckIcon className="w-5 h-5 me-2" aria-hidden="true" />
                                                    Validate
                                                </Button>

                                                <Button id={`refuse-company-${companyInfo.id}`} intent="delete" className=" inline-flex items-center" onClick={() => refuseCompany(companyInfo.id)}>
                                                    <CheckIcon className="w-5 h-5 me-2" aria-hidden="true" />
                                                    Refuse
                                                </Button>
                                            </div>
                                        )
                                    }
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
