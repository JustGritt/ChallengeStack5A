"use client";
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, CalendarIcon, ChartPieIcon, Cog6ToothIcon, HomeIcon, UsersIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/lib/services/slices/authSlice';
import { classNames } from '@/lib/helpers/utils';
import DashboardProfileHeader from '../Dashboard/DashboardProfileHeader';
import Link from 'next/link';

export default function DashboardMenu() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    // get the current logged user
    const user = useSelector(selectCurrentUser);


    const pathname = usePathname()
    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: pathname === '/dashboard' },
        { name: 'Employees', href: '/dashboard/employees', icon: UsersIcon, current: pathname === '/dashboard/employees' },
        { name: 'Reservations', href: '/dashboard/appointments', icon: CalendarIcon, current: pathname === '/dashboard/appointments' },
        { name: 'Statistics', href: '/dashboard/statistics', icon: ChartPieIcon, current: pathname === '/dashboard/statistics' },
    ]

    return (
        <header>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-900/80 dark:bg-gray-800/80"></div>
                    </Transition.Child>

                    <div className="fixed inset-0 flex ">
                        <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" className="-m-2.5 p-2.5" onClick={()=> setSidebarOpen(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-800 px-6 pb-4">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <Image src="/logo.svg" className="h-6 mr-4" alt="logo" width={32} height={32} />
                                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-100 text-black">Odicylens</span>
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" className="-mx-2 space-y-1">
                                                    {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link href={item.href} className={classNames( item.current
                                                            ? 'bg-gray-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-300'
                                                            : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                                                            , 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                            )}>
                                                            <item.icon className={classNames( item.current
                                                                ? 'text-indigo-600 dark:text-indigo-300'
                                                                : 'text-gray-400 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-200'
                                                                , 'h-6 w-6 shrink-0' )} aria-hidden="true" />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                    ))}
                                                </ul>
                                            </li>

                                            <li className="mt-auto">
                                                <a href="/dashboard/profile"
                                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-indigo-600 dark:hover:text-indigo-200">
                                                    <Cog6ToothIcon
                                                        className="h-6 w-6 shrink-0 text-gray-400 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-200"
                                                        aria-hidden="true" />
                                                    Settings
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            
            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col dark:bg-slate-600">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <a href="/" className="inline-flex items-center justify-center">
                            <Image src="/logo.svg" className="h-6 w-auto mr-4" alt="logo" width={32} height={32} />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Odicylens</span>
                        </a>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className={classNames( item.current
                                            ? 'bg-gray-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                                            , 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold' )}>
                                            <item.icon className={classNames( item.current
                                                ? 'text-indigo-600 dark:text-indigo-300'
                                                : 'text-gray-400 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-200'
                                                , 'h-6 w-6 shrink-0' )} aria-hidden="true" />
                                            {item.name}
                                        </a>
                                    </li>
                                    ))}
                                </ul>
                            </li>
                            <li>{user?.firstname}</li>
                            <li className="mt-auto">
                                <a href="/dashboard/profile"
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-indigo-600 dark:hover:text-indigo-200">
                                    <Cog6ToothIcon
                                        className="h-6 w-6 shrink-0 text-gray-400 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-200"
                                        aria-hidden="true" />
                                    Settings
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="lg:pl-72">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 lg:hidden" onClick={()=>
                        setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Separator */}
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" aria-hidden="true" />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <form className="relative flex flex-1 justify-center items-center" action="#" method="GET">
                            <label htmlFor="search-field" className="sr-only">
                                Search
                            </label>
                            <MagnifyingGlassIcon className="pointer-events-none absolute inset-y-0 left-4 h-full w-5 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                            <input id="search-field" className="block h-12 w-full border-0 py-0 pl-12 pr-4 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:ring-0 sm:text-sm dark:bg-slate-700 rounded-xl" placeholder="Search..." type="search" name="search" />
                        </form>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400">
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Separator */}
                            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:bg-gray-700" aria-hidden="true" />

                            {/* Profile dropdown */}
                            {user && <DashboardProfileHeader {...user} />}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
