"use client";

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/lib/services/slices/authSlice';
import { CalendarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

export default function Company() {

    const user = useSelector(selectCurrentUser);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">

                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                        Your Company
                    </h2>

                    {
                        user?.companie ? (
                            <div>
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                    {user?.companie.name}
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Latest</span>
                                </h3>
                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 mt-2">
                                    <ShoppingBagIcon className="w-5 h-5 me-2" aria-hidden="true" />
                                    Link to Store
                                </a>
                            </div>
                        ) : (
                            <div>
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
