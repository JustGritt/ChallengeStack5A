
import { Button } from '@/components/Ui/Button';
import { useSelector } from 'react-redux';
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { useEffect, useState } from 'react';
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
export default function StoreCalendar() {

    const [schedules, setSchedules] = useState([]);
    const user = useSelector(selectCurrentUser);

    // Get session
    const [parsedToken, setParsedSession] = useState<undefined| string>();
    useEffect(() => {
        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            setParsedSession(session?.token);
        })();
    }, [])

    const [stores, setStores] = useState([]);
    const [storeFetched, setStoreFetched] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

    // Get all stores
    useEffect(() => {
        if (user && !storeFetched && parsedToken) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${user?.companie?.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${parsedToken}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setStores(data.stores);
                })
                setStoreFetched(true);
        }
    }, [storeFetched, user, parsedToken]);

    useEffect(() => {
        handleStoreSelect();
    }, [selectedDate]);

    const fetchCompanySchedules = (storeId: string) => {
        const nextDateValue = new Date(new Date(selectedDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${storeId}/schedules?startDate%5Bafter%5D=${selectedDate}&endDate%5Bbefore%5D=${nextDateValue}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${parsedToken}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setSchedules(data["hydra:member"]);
            })
    }

    const handleStoreSelect = () => {
        const selectedStore = document.getElementById('selectedStore') as HTMLSelectElement;

        if(selectedStore.value !== "") {
            fetchCompanySchedules(selectedStore.value);
        }
    }

    const handlePreviousDate = () => {
        setSelectedDate(new Date(new Date(selectedDate).getTime() - 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
    }

    const handleNextDate = () => {
        setSelectedDate(new Date(new Date(selectedDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
    }

    const cancelVacation = (scheduleId: string) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/${scheduleId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/merge-patch+json",
                "Authorization": `Bearer ${parsedToken}`
            },
            body: JSON.stringify({
                onVacation: false,
                refused: true
            })
        })
            .then((res) => res.json())
            .then((data) => {
                setSchedules(data["hydra:member"]);
            })
    }

    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                Your companies schedule
            </h2>
            <div className="flex justify-center items-center mb-8">
                <select
                    id="selectedStore"
                    name="selectedStore"
                    className="flex-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {
                        stores.map((store: any) => (
                            <option key={store.id} value={store.id}>{store.name}</option>
                        ))
                    }
                </select>

                <Button onClick={() => handleStoreSelect()}
                    intent="default"
                    className="flex-none flex-2 ml-4">
                    <ArrowPathIcon className="h-5 w-5" />
                </Button>
            </div>

            <div className="flex justify-center items-center mb-8">
                <Button onClick={() => handlePreviousDate()}
                    intent="default"
                    className="flex-none flex-2 mr-4">
                    <ChevronLeftIcon className="h-5 w-5" />
                </Button>
                <h2 className="text-xl tracking-tight text-gray-900">
                    {new Date(selectedDate).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </h2>
                <Button onClick={() => handleNextDate()}
                    intent="default"
                    className="flex-none flex-2 ml-4">
                    <ChevronRightIcon className="h-5 w-5" />
                </Button>
            </div>

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle ">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">

                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-4 px-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                                                Type
                                            </th>
                                            <th scope="col" className="py-4 px-3 text-center text-sm font-semibold text-gray-900">
                                                Name
                                            </th>
                                            <th scope="col" className="py-4 px-3 text-center text-sm font-semibold text-gray-900">
                                                Start
                                            </th>
                                            <th scope="col" className="py-4 px-3 text-center text-sm font-semibold text-gray-900">
                                                End
                                            </th>
                                            <th scope="col" className="text-center relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {
                                            schedules && schedules.filter((schedule: any) => schedule.onVacation).length > 0 ? (
                                                schedules.filter((schedule: any) => schedule.onVacation).map((schedule: any) => (
                                                    <tr key={schedule.id}>
                                                        <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">Vacation</span>
                                                        </td>
                                                        <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {schedule.employee.email}
                                                        </td>
                                                        <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {schedule.startDate.replace("T", " ").split("+")[0]}
                                                        </td>
                                                        <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {schedule.endDate.replace("T", " ").split("+")[0]}
                                                        </td>
                                                        <td className="text-center relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                                                            <Button intent="delete" onClick={() => cancelVacation(schedule.id)}>
                                                                Cancel
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="text-center py-8 px-3 text-sm text-gray-500">
                                                        No vacations found
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>

                                <table className="min-w-full divide-y divide-gray-300 mt-4">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-4 px-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                                                Type
                                            </th>
                                            <th scope="col" className="py-4 px-3 text-center text-sm font-semibold text-gray-900">
                                                Name
                                            </th>
                                            <th scope="col" className="py-4 px-3 text-center text-sm font-semibold text-gray-900">
                                                Start
                                            </th>
                                            <th scope="col" className="py-4 px-3 text-center text-sm font-semibold text-gray-900">
                                                End
                                            </th>
                                            <th scope="col" className="py-4 px-3 text-center text-sm font-semibold text-gray-900">
                                                More details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {
                                            schedules && schedules.length > 0 ? (
                                                schedules.filter((schedule: any) => !schedule.onVacation)
                                                    .map((schedule: any) => (
                                                        <tr key={schedule.id}>
                                                            <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Working</span>
                                                            </td>
                                                            <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                {schedule.employee.email}
                                                            </td>
                                                            <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                {schedule.startDate.replace("T", " ").split("+")[0]}
                                                            </td>
                                                            <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                {schedule.endDate.replace("T", " ").split("+")[0]}
                                                            </td>
                                                            <td className="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                <Link href={`/dashboard/${schedule.store}/employees/${schedule.employee.id}`} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                                    Details
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="text-center py-8 px-3 text-sm text-gray-500">
                                                        No schedules found
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
