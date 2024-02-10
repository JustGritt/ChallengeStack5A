"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";
import { CalendarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

export default function History() {

    const user = useSelector(selectCurrentUser);
    console.log(user)

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">

                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Your History</h2>

                    <ol className="relative border-s border-gray-200 dark:border-gray-700">
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                <CalendarIcon className="w-4 h-4 text-blue-800 dark:text-blue-300" aria-hidden="true" />
                            </span>
                            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                Photoshoot with John Doe at PhotoPro
                                <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Latest</span>
                            </h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">January 13th, 2024</time>
                            <Link href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 mt-2">
                                <ShoppingBagIcon className="w-5 h-5 me-2" aria-hidden="true" />
                                Link to Store
                            </Link>
                        </li>
                        <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                <CalendarIcon className="w-4 h-4 text-blue-800 dark:text-blue-300" aria-hidden="true" />
                            </span>
                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Movie Recording with Jane Doe at ParisCiné</h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">December 7th, 2023</time>
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi ipsam dolorem sint molestias maiores odio a perferendis quidem asperiores beatae.</p>
                            <Link href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 mt-2">
                                <ShoppingBagIcon className="w-5 h-5 me-2" aria-hidden="true" />
                                Link to Store
                            </Link>
                        </li>
                    </ol>


                </div>
            </div>
        </section>
    )
}
