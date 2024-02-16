"use client";

import Link from "next/link";
import { useSelector } from 'react-redux';
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { selectCurrentUserConfig } from '@/lib/services/slices/authSlice';
import { useEffect, useMemo, useState } from 'react';
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Employees() {

    const userConfig = useSelector(selectCurrentUserConfig);
    const userRoles = useMemo(() => Object.keys(userConfig || {}).filter((role) => userConfig[role as keyof UserConfigType]), [userConfig]);

    // Get session
    const [parsedSession, setParsedSession] = useState<any>({});
    useEffect(() => {
        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            setParsedSession(session);
        })();
    }, [])

    const [employees, setEmployees] = useState<any[]>([]);
    const [employeesFetched, setEmployeesFetched] = useState(false);
    useEffect(() => {
        const fetchEmployees = async () => {
            if (!employeesFetched && parsedSession?.token && userRoles.includes("isAdmin")) {
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${parsedSession?.token}`
                    }
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setEmployees(data["hydra:member"])
                    });

                setEmployeesFetched(true);
            }

            if (!employeesFetched && parsedSession?.token && (userRoles.includes("isOwner") || userRoles.includes("isWorker"))) {
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/${parsedSession?.user?.companie?.id}/employee`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${parsedSession?.token}`
                    }
                })
                    .then((res) => res.json())
                    .then((data) => setEmployees(data));
                setEmployeesFetched(true);
            }
        };
        fetchEmployees();
    }, [employeesFetched, parsedSession, userConfig, userRoles]);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    {
                        employees.length === 0 ? (
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 inline">Your Employees</h2>
                                <p className="text-gray-500">No employees found</p>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 inline">Your Employees ({employees.length})</h2>
                                <ul className="mt-8 grid grid-cols-2 gap-4">
                                    {
                                        employees.map((employee, index) => (
                                            <li key={index} className="flex justify-between gap-6 w-full rounded px-4 hover:bg-gray-100 shadow">
                                                <div className="flex w-full gap-4 py-4">
                                                    <div className="h-12 w-12 flex-none rounded-full bg-gray-200 grid place-items-center font-bold capitalize">{employee.email.charAt(0)}</div>
                                                    <div className="relative w-full flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{employee.firstname}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{employee.email}</p>
                                                        {
                                                            employee?.work && (
                                                                <Link className="mt-1 truncate text-xs leading-5 text-indigo-600" href={`/dashboard/stores/${employee?.work?.id}`}>
                                                                    See store
                                                                </Link>

                                                            )
                                                        }

                                                        {
                                                            employee?.isValid ? (
                                                                <span className="absolute top-1 right-1 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    <CheckIcon className="w-5 h-5 mr-1" />
                                                                    Valid
                                                                </span>
                                                            ) : (
                                                                <span className="absolute top-1 right-1 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                                                    <XMarkIcon className="w-5 h-5 mr-1" />
                                                                    Not valid
                                                                </span>

                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
