"use client";
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, CalendarIcon, ChartPieIcon, ShoppingCartIcon, Cog6ToothIcon, HomeIcon, UsersIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/lib/services/slices/authSlice';
import { classNames } from '@/lib/helpers/utils';
import DashboardProfileHeader from '../Dashboard/DashboardProfileHeader';
import Link from 'next/link';
import { getUserCookie } from '@/lib/helpers/UserHelper';
import { UserCookieType } from '@/types/User';

export default function DashboardMenu() {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const user = useSelector(selectCurrentUser);
    const pathname = usePathname()

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: pathname === '/dashboard' },
        { name: 'Stores', href: '/dashboard/stores', icon: ShoppingCartIcon, current: pathname === '/dashboard/stores' },
        { name: 'Employees', href: '/dashboard/stores/employees', icon: UsersIcon, current: pathname === '/dashboard/store/employees' },
        { name: 'Reservations', href: '/dashboard/appointments', icon: CalendarIcon, current: pathname === '/dashboard/appointments' },
        { name: 'Statistics', href: '/dashboard/statistics', icon: ChartPieIcon, current: pathname === '/dashboard/statistics' },
    ]

    const userNavigation = [
        { name: 'Your profile', href: '/dashboard/profile' },
        { name: 'Sign out', href: '/dashboard/logout' },
    ]

    return (
        <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full" enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full">
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0"
                                    enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" className="-m-2.5 p-2.5" onClick={()=>
                                            setSidebarOpen(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                {/* Sidebar component, swap this element with another sidebar if you like */}
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <Image src="/logo.svg"  alt="logo" width={32}
                                            height={32} />
                                        <span className="ml-4 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Odicylens</span>
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
                                                                ? 'text-indigo-600'
                                                                : 'text-gray-400 group-hover:text-indigo-600'
                                                                , 'h-6 w-6 shrink-0' )} aria-hidden="true" />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                    ))}

                                                    <li>
                                                        <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                                                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                                            </svg>
                                                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                                                            </svg>
                                                        </button>
                                                        <ul id="dropdown-example" className="hidden py-2 space-y-2">
                                                            <li>
                                                                <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li className="mt-auto">
                                                <a href="/dashboard/profile"
                                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                                                    <Cog6ToothIcon
                                                        className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
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
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <a href="/" className="inline-flex items-center justify-center">
                            <Image src="/logo.svg"  alt="logo" width={32} height={32} />
                            <span className="ml-4 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Odicylens</span>
                        </a>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                    <li key={item.name}>

                                        <a href={item.href} className={classNames( item.current
                                            ? 'bg-gray-50 text-indigo-600'
                                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                                            , 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold' )}>
                                            <item.icon className={classNames( item.current ? 'text-indigo-600'
                                                : 'text-gray-400 group-hover:text-indigo-600' , 'h-6 w-6 shrink-0' )}
                                                aria-hidden="true" />
                                            {item.name}
                                        </a>
                                    </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="mt-auto">
                                <a href="/dashboard/profile"
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                                    <Cog6ToothIcon
                                        className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                        aria-hidden="true" />
                                    Settings
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="lg:pl-72">
                <div
                    className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={()=>
                        setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Separator */}
                    <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <form className="relative flex flex-1" action="#" method="GET">
                            <label htmlFor="search-field" className="sr-only">
                                Search
                            </label>
                            <MagnifyingGlassIcon
                                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                                aria-hidden="true" />
                            <input id="search-field"
                                className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                placeholder="Search..." type="search" name="search" />
                        </form>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <button type="button" className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                {/* TODO: Update with the number of items to validate */}
                                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-900">3</div>
                            </button>

                            {/* Separator */}
                            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

                            {/* Profile dropdown */}
                            {user && <DashboardProfileHeader {...user} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
