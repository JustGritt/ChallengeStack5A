"use client";

import { Button } from "@/components/Ui/Button";
import { useSelector } from 'react-redux';
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { selectCurrentUser } from '@/lib/services/slices/authSlice';
import { useEffect, useState } from 'react'
import { BellIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Notifications() {

    const user = useSelector(selectCurrentUser);
    const [notifications, setNotifications] = useState<any[]>([])

    useEffect(() => {
        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            const parsedSession = JSON.parse(session?.value || "{}");
            if (user?.roles.includes('ROLE_ADMIN') || user?.roles.includes('ROLE_SUPER_ADMIN')) {
                await fetch('https://api.odicylens.com/companies?page=0', { method: 'GET', headers: { 'Authorization': `Bearer ${parsedSession?.token}` } })
                    .then(response => response.json())
                    .then(data => data['hydra:member'].map((company: any) => {
                        console.log(company)
                        if(!company.isValid) setNotifications([...notifications, company])
                    }))
            }
        })();
    }, [user])

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                        Notifications
                    </h2>

                    <ol className="relative">

                        {
                            notifications.map((notification: any) => (
                                <li className="flex items-center mb-10 ms-6" key={notification.id}>
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                        <BellIcon className="w-4 h-4 text-blue-800 dark:text-blue-300" aria-hidden="true" />
                                    </span>

                                    <div className="block w-full flex justify-between items-center">
                                        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                            {notification.name}
                                            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Latest</span>
                                        </h3>
                                        <div className="flex gap-4">
                                            <Button intent="default" type="submit" className="inline-flex items-center mt-2">
                                                <CheckIcon className="w-5 h-5 me-2" aria-hidden="true" />
                                                Validate
                                            </Button>

                                            <Button intent="default" type="submit" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 mt-2">
                                                <XMarkIcon className="w-5 h-5 me-2" aria-hidden="true" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        </section>
    )
}
