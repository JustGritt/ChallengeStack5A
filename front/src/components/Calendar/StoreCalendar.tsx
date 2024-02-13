
import { Button } from '@/components/Ui/Button';
import { useSelector } from 'react-redux';
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { useEffect, useMemo, useState } from 'react';
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function StoreCalendar() {

    const [schedules, setSchedules] = useState([]);

    const user: any = useSelector(selectCurrentUser);
    const userConfig: { [key: string]: boolean } = useSelector(selectCurrentUserConfig);
    const userRoles = useMemo(() => Object.keys(userConfig || {}).filter(role => userConfig[role]), [userConfig]);

    // Get session
    const [parsedSession, setParsedSession] = useState<any>({});
    useEffect(() => {
        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            const parsedSession = JSON.parse(session?.value || "{}");
            setParsedSession(parsedSession);
        })();
    }, [])

    const [stores, setStores] = useState([]);
    const [storeFetched, setStoreFetched] = useState(false);
    const [selectedStore, setSelectedStore] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);


    // Get all stores
    useEffect(() => {
        if (user && !storeFetched && parsedSession.token) {
            fetch(`https://api.odicylens.com/companies/${user?.companie?.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${parsedSession.token}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setStores(data.stores);
                })
                setStoreFetched(true);
        }
    }, [storeFetched, user, parsedSession]);

    useEffect(() => {
        handleStoreSelect();
    }, [selectedDate]);

    const fetchCompanySchedules = (storeId: string) => {
        const nextDateValue = new Date(new Date(selectedDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
        fetch(`https://api.odicylens.com/stores/${storeId}/schedules?startDate%5Bafter%5D=${selectedDate}&endDate%5Bbefore%5D=${nextDateValue}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${parsedSession.token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("events: ", data["hydra:member"]);
                setSchedules(data["hydra:member"]);
            })
    }

    const handleStoreSelect = () => {
        const selectedStore = document.getElementById('selectedStore') as HTMLSelectElement;
        setSelectedStore(selectedStore.value);

        if(selectedStore.value !== "") {
            console.log("selectedStore.value: ", selectedStore.value)
            fetchCompanySchedules(selectedStore.value);
        }
    }

    const handlePreviousDate = () => {
        setSelectedDate(new Date(new Date(selectedDate).getTime() - 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
    }

    const handleNextDate = () => {
        setSelectedDate(new Date(new Date(selectedDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
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
                                            <th scope="col" className="py-4 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Type
                                            </th>
                                            <th scope="col" className="py-4 px-3 text-left text-sm font-semibold text-gray-900">
                                                Name
                                            </th>
                                            <th scope="col" className="py-4 px-3 text-left text-sm font-semibold text-gray-900">
                                                Start
                                            </th>
                                            <th scope="col" className="py-4 px-3  text-left text-sm font-semibold text-gray-900">
                                                End
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {
                                            schedules.filter((schedule: any) => schedule.onVacation).length > 0 ? (
                                                schedules.filter((schedule: any) => schedule.onVacation).map((schedule: any) => (
                                                    <tr key={schedule.id}>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">Vacation</span>
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {schedule.employee.email}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {schedule.startDate.replace("T", " ").split("+")[0]}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {schedule.endDate.replace("T", " ").split("+")[0]}
                                                        </td>
                                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                            <Button intent="delete">
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
                                            <th scope="col" className="py-4 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Type
                                            </th>
                                            <th scope="col" className="py-4 px-3 text-left text-sm font-semibold text-gray-900">
                                                Name
                                            </th>
                                            <th scope="col" className="py-4 px-3 text-left text-sm font-semibold text-gray-900">
                                                Start
                                            </th>
                                            <th scope="col" className="py-4 px-3  text-left text-sm font-semibold text-gray-900">
                                                End
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {
                                            schedules.length > 0 ? (
                                                schedules
                                                    .filter((schedule: any) => !schedule.onVacation)
                                                    .map((schedule: any) => (
                                                        <tr key={schedule.id}>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Working</span>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                {schedule.employee.email}
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                {schedule.startDate.replace("T", " ").split("+")[0]}
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                {schedule.endDate.replace("T", " ").split("+")[0]}
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
