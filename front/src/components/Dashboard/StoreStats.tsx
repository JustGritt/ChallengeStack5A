
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/react/24/outline'

const stats = [
    { id: 1, name: 'Visitors/Clients', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
    { id: 2, name: 'Bookings', stat: '58.16%', icon: EnvelopeOpenIcon, change: '5.4%', changeType: 'increase' },
    { id: 3, name: 'Revenue', stat: '24.57%', icon: CursorArrowRaysIcon, change: '3.2%', changeType: 'decrease' },
]

import Link from "next/link";
import DashboardStat from '@/components/Dashboard/DashboardStat';
import { Company } from "@/types/Company";
import { useSelector } from 'react-redux';
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react';
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';

export default function DashboardStats() {

    const user = useSelector(selectCurrentUser);
    console.log(user)

    const [companyStatsFetched, setCompanyStatsFetched] = useState(false);
    const [companyStats, setCompanyStats] = useState<Company[]>([]);
    const [userRoles, setUserRoles] = useState<string[]>([]);

    useEffect(() => {
        const fetchCompanyStats = async () => {
            if (user?.companie && !companyStatsFetched) {
                fetch(`https://api.odicylens.com/stores/${user.companie.id}/dashboard`, { method: "GET" })
                    .then((res) => res.json())
                    .then((data) => console.log(data)); // [1]
                setCompanyStatsFetched(true);
            }
        };

        fetchCompanyStats();
    }, [user, companyStatsFetched]);

    return (
        <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.id} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                        <dt>
                            <div className="absolute rounded-md bg-indigo-500 p-3">
                                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                            <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                            <p className="ml-2 flex items-baseline text-sm font-semibold text-gray-500">
                                <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                                {/* <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" /> */}

                                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                                {item.change}
                            </p>
                            <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    View all<span className="sr-only"> {item.name} stats</span>
                                </a>
                                </div>
                            </div>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}