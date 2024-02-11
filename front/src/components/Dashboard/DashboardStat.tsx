
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'

import { Store } from "@/types/Store";
import { useSelector } from 'react-redux';
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { useEffect, useState } from 'react';
import { selectCurrentUser } from '@/lib/services/slices/authSlice';

export default function DashboardStats() {

    const user = useSelector(selectCurrentUser);

    const [companyStats, setCompanyStats] = useState<any[]>([]);
    const [stores, setStores] = useState<Store[]>([]);

    // Get session
    const [parsedSession, setParsedSession] = useState<any>({});
    useEffect(() => {
        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            const parsedSession = JSON.parse(session?.value || "{}");
            setParsedSession(parsedSession);
        })();
    }, [])

    useEffect(() => {
        const fetchCompanyStores = async () => {
            if (user?.companie) {
                const response = await fetch(`https://api.odicylens.com/companies/${user.companie.id}`);
                const data = await response.json();
                setStores(data.stores);
            }
        };

        fetchCompanyStores();
    }, [user]);

    // Type for companyStatValues is any because the keys are dynamic
    const [companyStatValues, setCompanyStatValues] = useState<any>({
        total_bookings_today: 0,
        total_cancelled_bookings_today: 0,
        total_benefits: 0,
        total_bookings_last_day: 0,
        total_cancelled_bookings_last_day: 0,
        total_benefits_last_day: 0,
        total_bookings_month: 0,
        total_cancelled_bookings_month: 0,
        total_benefits_month: 0,
        total_bookings_from_beginning: 0,
        total_benefits_from_beginning: 0,
        total_cancelled_bookings_from_beginning: 0
    });

    useEffect(() => {
        const fetchStores = async () => {
            if (user?.companie) {
                const statsPromises = stores.map(store => fetch(`https://api.odicylens.com/stores/${store.id}/dashboard`, { method: 'GET', headers: { 'Authorization': `Bearer ${parsedSession?.token}` } })
                    .then(response => response.json())
                    .then(data => data)
                );

                const stats = await Promise.all(statsPromises);
                setCompanyStats(stats);

                // Aggregate all the stats from the stores to companyStatValues
                const companyStats = stats.reduce((acc, storeStats) => {
                    return {
                        // Today
                        total_bookings_today: acc.total_bookings_today + storeStats.total_bookings_today,
                        total_cancelled_bookings_today: acc.total_cancelled_bookings_today + storeStats.total_cancelled_bookings_today,
                        total_benefits: acc.total_benefits + storeStats.total_benefits,
                        // Yesterday
                        total_bookings_last_day: acc.total_bookings_last_day + storeStats.total_bookings_last_day,
                        total_cancelled_bookings_last_day: acc.total_cancelled_bookings_last_day + storeStats.total_cancelled_bookings_last_day,
                        total_benefits_last_day: acc.total_benefits_last_day + storeStats.total_benefits_last_day,
                        // Month
                        total_bookings_month: acc.total_bookings_month + storeStats.total_bookings_month,
                        total_cancelled_bookings_month: acc.total_cancelled_bookings_month + storeStats.total_cancelled_bookings_month,
                        total_benefits_month: acc.total_benefits_month + storeStats.total_benefits_month,
                        // From beginning
                        total_bookings_from_beginning: acc.total_bookings_from_beginning + storeStats.total_bookings_from_beginning,
                        total_benefits_from_beginning: acc.total_benefits_from_beginning + storeStats.total_benefits_from_beginning,
                        total_cancelled_bookings_from_beginning: acc.total_cancelled_bookings_from_beginning + storeStats.total_cancelled_bookings_from_beginning
                    };
                }, companyStatValues);

                setCompanyStatValues(companyStats);
            }
        };

        fetchStores();
    }, [stores, user]);

    return (
        <section>
            <div className="flex justify-center flex-col">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Today</h3>

                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        Object.keys(companyStatValues)
                            .filter(key => key.includes('today'))
                            .map((key, index) => (
                                <div key={index} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                                    <dt>
                                        <div className="absolute rounded-md bg-indigo-500 p-3">
                                            <UsersIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 truncate text-sm font-medium text-gray-500 capitalize">
                                            {key.replace(/_/g, ' ')}
                                        </p>
                                    </dt>
                                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                                        <p className="text-2xl font-semibold text-gray-900 capitalize">
                                            {companyStatValues[key]}
                                        </p>
                                        <span className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6"></span>
                                    </dd>
                                </div>
                            ))
                    }
                </dl>
            </div>

            <div className="flex justify-center flex-col mt-4">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Yesterday</h3>

                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        Object.keys(companyStatValues)
                            .filter(key => key.includes('last_day'))
                            .map((key, index) => (
                                <div key={index} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                                    <dt>
                                        <div className="absolute rounded-md bg-indigo-500 p-3">
                                            <UsersIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 truncate text-sm font-medium text-gray-500 capitalize">
                                            {key.replace(/_/g, ' ')}
                                        </p>
                                    </dt>
                                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                                        <p className="text-2xl font-semibold text-gray-900 capitalize">
                                            {companyStatValues[key]}
                                        </p>
                                        {/* TODO: Add difference between dates */}
                                        {/* <p className="ml-2 flex items-baseline text-sm font-semibold text-gray-500">
                                            <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                                            <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                                            <span className="sr-only"> Increased by </span>
                                            Diff
                                        </p> */}
                                        <span className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6"></span>
                                    </dd>
                                </div>
                            ))
                    }
                </dl>
            </div>

            <div className="flex justify-center flex-col mt-4">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>

                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        Object.keys(companyStatValues)
                            .filter(key => key.includes('month'))
                            .map((key, index) => (
                                <div key={index} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                                    <dt>
                                        <div className="absolute rounded-md bg-indigo-500 p-3">
                                            <UsersIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 truncate text-sm font-medium text-gray-500 capitalize">
                                            {key.replace(/_/g, ' ')}
                                        </p>
                                    </dt>
                                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                                        <p className="text-2xl font-semibold text-gray-900 capitalize">
                                            {companyStatValues[key]}
                                        </p>
                                        <span className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6"></span>
                                    </dd>
                                </div>
                            ))
                    }
                </dl>
            </div>

            <div className="flex justify-center flex-col mt-4">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Ever</h3>

                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        Object.keys(companyStatValues)
                            .filter(key => key.includes('from_beginning'))
                            .map((key, index) => (
                                <div key={index} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                                    <dt>
                                        <div className="absolute rounded-md bg-indigo-500 p-3">
                                            <UsersIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 truncate text-sm font-medium text-gray-500 capitalize">
                                            {key.replace(/_/g, ' ')}
                                        </p>
                                    </dt>
                                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                                        <p className="text-2xl font-semibold text-gray-900 capitalize">
                                            {companyStatValues[key]}
                                        </p>
                                        <span className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6"></span>
                                    </dd>
                                </div>
                            ))
                    }
                </dl>
            </div>
        </section>
    )
}