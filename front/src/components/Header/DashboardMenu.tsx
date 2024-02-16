"use client";

import Link from 'next/link';
import Image from 'next/image'
import DashboardProfileHeader from '../Dashboard/DashboardProfileHeader';
import { classNames } from '@/lib/helpers/utils';
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux';
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';
import { Bars3Icon, BellIcon, CalendarIcon, ShoppingCartIcon, Cog6ToothIcon, HomeIcon, UsersIcon, XMarkIcon, ClockIcon, UserIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function DashboardMenu() {

    const pathname = usePathname()
    const user = useSelector(selectCurrentUser);
    const userConfig = useSelector(selectCurrentUserConfig);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [userRoles, setUserRoles] = useState<any[]>([]);

    // Get session
    const [parsedSession, setParsedSession] = useState<any>({});
    useEffect(() => {
        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            const parsedSession = JSON.parse(session?.value || "{}");
            setParsedSession(parsedSession);
            setUserRoles(Object.keys(userConfig).filter(key => (userConfig as any)[key] === true))
        })();
    }, [userConfig])
    
    // Get company to validate
    const fetchCompanies = useCallback(async () => {
        if (userRoles.includes('isAdmin')) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${parsedSession?.token}` }
            }).then(response => response.json());
            const data = await response;
            const invalidCompanies = data['hydra:member'].filter((company: any) => (!company.isValid && !company.refused));
            return setNotifications(invalidCompanies);
        }
    }, [userRoles, parsedSession]);

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    const appointmentLabel = userRoles.includes('isClient') ? 'My appointments' : 'Schedule';

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: pathname === '/dashboard', role: ['isAdmin', 'isOwner', 'isWorker', 'isClient'] },
        { name: 'Company', href: '/dashboard/company', icon: ShoppingCartIcon, current: pathname === '/dashboard/company', role: ['isAdmin', 'isOwner'] },
        { name: 'Store', href: '/dashboard/stores', icon: ShoppingCartIcon, current: pathname === '/dashboard/stores', role: ['isWorker', 'isAdmin', 'isOwner'] },
        { name: 'Employees', href: '/dashboard/employees', icon: UsersIcon, current: pathname === '/dashboard/employees', role: ['isAdmin', 'isOwner'] },
        { name: appointmentLabel , href: '/dashboard/appointments', icon: CalendarIcon, current: pathname === '/dashboard/appointments', role: ['isOwner', 'isWorker', 'isClient'] },
        { name: 'History', href: '/dashboard/history', icon: ClockIcon, current: pathname === '/dashboard/history', role: ['isWorker', 'isClient'] },
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
                                                    {
                                                        navigation.map((item) => {
                                                            if (userRoles.some(role => item.role.includes(role))) {
                                                                return (
                                                                    <li key={item.name}>
                                                                        <Link href={item.href}>
                                                                            <span className={classNames( item.current
                                                                                ? 'bg-gray-50 text-indigo-600'
                                                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                                                                                , 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold' )}>
                                                                                <item.icon className={classNames( item.current ? 'text-indigo-600'
                                                                                    : 'text-gray-400 group-hover:text-indigo-600' , 'h-6 w-6 shrink-0' )} aria-hidden="true" />
                                                                                {item.name}
                                                                            </span>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </ul>
                                            </li>

                                            <li className="mt-auto">
                                                <a href="/dashboard/profile"
                                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                                                    <Cog6ToothIcon
                                                        className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                                        aria-hidden="true" />
                                                    Profile
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
                                    {
                                        navigation.map((item) => {
                                            if (userRoles.some(role => item.role.includes(role))) {
                                                return (
                                                    <li key={item.name}>
                                                        <Link href={item.href}>
                                                            <span className={classNames( item.current
                                                                ? 'bg-gray-50 text-indigo-600'
                                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                                                                , 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold' )}>
                                                                <item.icon className={classNames( item.current ? 'text-indigo-600'
                                                                    : 'text-gray-400 group-hover:text-indigo-600' , 'h-6 w-6 shrink-0' )} aria-hidden="true" />
                                                                {item.name}
                                                            </span>
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                        })
                                    }
                                </ul>
                            </li>
                            <li className="mt-auto">
                                <a href="/dashboard/profile"
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                                    <UserIcon
                                        className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                        aria-hidden="true" />
                                    Edit Profile
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
                            <a href="/dashboard/notifications" className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                {
                                    notifications.length > 0 ? (
                                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-900">
                                            {notifications.length}
                                        </div>
                                    ) : null
                                }
                            </a>

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
