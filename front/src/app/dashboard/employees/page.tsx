"use client";

import { useSelector } from 'react-redux';
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { selectCurrentUserConfig } from '@/lib/services/slices/authSlice';
import { useEffect, useMemo, useState } from 'react';

export default function Employees() {

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

    const [employees, setEmployees] = useState<any[]>([]);
    const [employeesFetched, setEmployeesFetched] = useState(false);
    useEffect(() => {
        const fetchEmployees = async () => {
            if (!employeesFetched && parsedSession?.token && userRoles.includes("isAdmin")) {
                fetch(`https://api.odicylens.com/company/2/employee`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${parsedSession?.token}`
                    }
                })
                    .then((res) => res.json())
                    .then((data) => setEmployees(data));

                setEmployeesFetched(true);
            }

            if (!employeesFetched && parsedSession?.token && (userRoles.includes("isOwner") || userRoles.includes("isWorker"))) {
                fetch(`https://api.odicylens.com/company/${parsedSession?.user?.companie?.id}/employee`, {
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
    }, [employeesFetched, parsedSession, userRoles]);

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
                                                <div className="flex min-w-0 gap-4 py-4">
                                                    <div className="h-12 w-12 flex-none rounded-full bg-gray-200 grid place-items-center font-bold">{employee.firstname.charAt(0)}</div>
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{employee.firstname}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{employee.email}</p>
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
