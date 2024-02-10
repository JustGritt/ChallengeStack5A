"use client";

import { HomeIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function EditStoreServices() {

    const pathname = usePathname()
    const [breadcrumb, setBreadcrumb] = useState<string[]>([])
    useEffect(() => {
        if (pathname) {
            const pathArray = pathname.split('/').filter((item) => item).slice(1)
            setBreadcrumb(pathArray)
        }
    }, [pathname])

    return (
        <nav className="flex mx-auto bg-white dark:bg-slate-800 p-4 rounded-xl shadow border" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <a href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <HomeIcon className="w-5 h-5 mr-2" />
                        Home
                    </a>
                </li>
                {
                    breadcrumb.map((item, index) => {
                        if (index === breadcrumb.length - 1) {
                            return (
                                <li key={index} aria-current="page">
                                    <div className="flex items-center">
                                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                                        <span className="ms-1 text-sm text-indigo-700 md:ms-2 dark:text-indigo-400 dark:hover:text-white capitalize font-bold">
                                            {item}
                                        </span>
                                    </div>
                                </li>
                            )
                        } else {
                            return (
                                <li key={index}>
                                    <div className="flex items-center">
                                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                                        <a href={`/dashboard/${breadcrumb.slice(0, index + 1).join('/')}`} className="ms-1 text-sm font-medium text-gray-700 md:ms-2 dark:text-gray-400 dark:hover:text-white capitalize">
                                            {item}
                                        </a>
                                    </div>
                                </li>
                            )
                        }
                    })
                }
            </ol>
        </nav>
    )
}
