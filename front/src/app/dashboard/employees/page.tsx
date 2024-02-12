"use client";

import { User } from "@/types/User";
import { Store } from "@/types/Store";


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

export default function Employees() {
    const [stores, setStores] = useState<Store[]>([]);

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

    const [employees, setEmployees] = useState<any[]>([]);
    const [employeesFetched, setEmployeesFetched] = useState(false);
    useEffect(() => {
        const fetchEmployees = async () => {
            if (!employeesFetched && parsedSession?.token) {
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
    }, [employeesFetched, parsedSession]);

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
                                        employees.map((employee) => (
                                            <li key={employee.id} className="flex justify-between gap-6 w-full rounded px-4 hover:bg-gray-100 shadow">
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
