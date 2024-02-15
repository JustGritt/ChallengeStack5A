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
import EmployeeDetailsCalendar from "@/components/Calendar/EmployeeDetailsCalendar";
import { parse } from 'path';

export default function EmployeeDetails({ params }: { params: { employeeId: string } }) {

    const userConfig: { [key: string]: boolean } = useSelector(selectCurrentUserConfig);
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

    // Get the employee
    const [employee, setEmployee] = useState<Employee>();
    const [employeeFetched, setEmployeeFetched] = useState(false);
    useEffect(() => {
        const fetchEmployees = async () => {
            if (!employeeFetched && parsedSession?.token) {
                fetch(`https://api.odicylens.com/users/${params.employeeId}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${parsedSession?.token}`
                    }
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setEmployee(data)
                    });
                setEmployeeFetched(true);
            }
        };
        fetchEmployees();
    }, [employeeFetched, parsedSession, userRoles]);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 pt-8 pb-4 rounded-xl shadow border">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                        Employee details
                    </h2>

                    <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                        <div className="flex justify-center items-center flex-col">
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <UserIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Name</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {employee?.firstname}
                            </p>
                        </div>
                        <div className="flex justify-center items-center flex-col">
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <ShoppingBagIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Working at store</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {employee?.work.toString().split("/").pop()}
                            </p>
                        </div>
                        <div className="flex justify-center items-center flex-col">
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                            <IdentificationIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">Employee status</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {employee?.isValid ? (
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        <CheckIcon className="w-5 h-5 mr-1" />
                                        Validated
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                        <XMarkIcon className="w-5 h-5 mr-1" />
                                        Not validated
                                    </span>
                            )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 mx-auto bg-white dark:bg-slate-800 px-8 pt-8 pb-4 rounded-xl shadow border">
                <EmployeeDetailsCalendar
                    employeeId={params?.employeeId}
                    employeeStore={employee?.work ?? null}
                />
                </div>
            </div>
        </section>
    )
}
