import { UsersIcon } from '@heroicons/react/24/outline'
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { useEffect, useState } from 'react';

export default function DashboardStats() {

    // Get session
    const [parsedSession, setParsedSession] = useState<any>({});
    useEffect(() => {
        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            const parsedSession = JSON.parse(session?.value || "{}");
            setParsedSession(parsedSession);
        })();
    }, [])

    const [companyStats, setCompanyStats] = useState<any[]>([]);
    const [companyStatsFetched, setCompanyStatsFetched] = useState(false);
    useEffect(() => {
        const fetchCompanyStats = async () => {
            if (!companyStatsFetched && parsedSession?.user?.companie?.id) {
                fetch(`https://api.odicylens.com/company/${parsedSession?.user?.companie?.id}/dashboard`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${parsedSession?.token}`
                    }
                })
                    .then((res) => res.json())
                    .then((data) => setCompanyStats(data));
                setCompanyStatsFetched(true);
            }
        };
        fetchCompanyStats();
    }, [companyStatsFetched, parsedSession]);

    return (
        <section>
            <div className="flex justify-center flex-col">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Today</h3>

                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        Object.keys(companyStats)
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
                                            {companyStats[key as keyof typeof companyStats]}
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
                        Object.keys(companyStats)
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
                                            {companyStats[key as keyof typeof companyStats]}
                                        </p>
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
                        Object.keys(companyStats)
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
                                            {companyStats[key as keyof typeof companyStats]}
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
                        Object.keys(companyStats)
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
                                            {companyStats[key as keyof typeof companyStats]}
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