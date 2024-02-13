"use client";

import toast from "react-hot-toast";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { Button } from '@/components/Ui/Button';
import { useSelector } from 'react-redux';
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { useEffect, useMemo, useState } from 'react';
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';

import StoreCalendar from "@/components/Calendar/StoreCalendar";

export default function Page() {
    const data: {
        title: string;
        start: any;
        end: any;
    }[] = [];

    const [scheduleFetched, setScheduleFetched] = useState(false);
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

    useEffect(() => {
        if (user && !scheduleFetched) {
            fetch(`https://api.odicylens.com/users/${user?.id}/schedules`, { method: "GET" })
                .then((res) => res.json())
                .then((data) => {
                    const events = data["hydra:member"].map((event: any) => ({
                        title: event.onVacation ? "Vacation" : "Work",
                        start: event.startDate,
                        end: event.endDate
                    }));

                    console.log("events: ", events);
                    setSchedules(events);
                })
            setScheduleFetched(true);
        }
    }, [scheduleFetched, user]);

    const handleDateSelect = (arg: any) => {
        const eventCategory = document.getElementById('selectedEvent') as HTMLSelectElement;
        const title = eventCategory.value;
        const calendarApi = arg.view.calendar;
        calendarApi.unselect();

        // If the title is not empty and the difference between the start and end date is below 10 hours
        if(title === "Work" && (arg.end - arg.start) / 1000 / 60 / 60 > 10) {
            toast.error("You can't work more than 10 hours at once");
            return;
        }

        // If there are events at the same time, prevent the user from adding a new one
        if(calendarApi.getEvents().some((event: any) => {
            console.log(event);
            return (arg.start >= event.start && arg.start <= event.end) || (arg.end >= event.start && arg.end <= event.end);
        })) {
            toast.error("You can't add an event at the same time as another one");
            return;
        }

        if (title) {
            calendarApi.addEvent({
                title,
                start: arg.start,
                end: arg.end,
                allDay: arg.allDay
            });

            data.push({
                title,
                start: arg.start.toISOString().replace('T', ' ').replace('Z', '').split('.')[0],
                end: arg.end.toISOString().replace('T', ' ').replace('Z', '').split('.')[0]
            });
        }
    }

    const handleRemoveEvent = (arg: any) => {
        if (confirm('Are you sure you want to delete this event?')) {
            arg.event.remove();
        }
    }

    // Save events as Worker
    const saveEvents = () => {
        if(userRoles.includes("isWorker")) {
            console.log("data: ", data);
            // const promises = data.map((event: any) => {
            //     return fetch(`https://api.odicylens.com/schedules`, {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //             "Authorization": `Bearer ${parsedSession?.token}`
            //         },
            //         body: JSON.stringify({
            //             startDate: event.start,
            //             endDate: event.end,
            //             onVacation: event.title === "Vacation",
            //             employee: `users/${user?.id}`,
            //             store: `stores/${user?.work?.id}`
            //         })
            //     })
            //     .then((res) => res.json());
            // });

            // Promise.all(promises)
            //     .then((data) => { console.log(data) })
            //     .catch((error) => { console.error(error) });
        }
    }

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                    {
                        userRoles.includes("isOwner") && (
                            <div className="lg:flex lg:h-full lg:flex-col">
                                <StoreCalendar />
                            </div>
                        )
                    }
                    {
                        (userRoles.includes("isWorker")) && (
                            <div className="lg:flex lg:h-full lg:flex-col">
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                                    Your schedule
                                </h2>
                                <div className="flex justify-center items-center mb-8">
                                    <select id="selectedEvent" className="flex-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option defaultValue="work">Work</option>
                                        <option defaultValue="vacation">Vacation</option>
                                    </select>

                                    <Button onClick={() => saveEvents()} className="flex-none flex-2 ml-4">
                                        Save events
                                    </Button>
                                </div>

                                <FullCalendar
                                    plugins={[ timeGridPlugin, interactionPlugin ]}
                                    initialView="timeGridWeek"
                                    selectable={true}
                                    nowIndicator={true}
                                    selectMirror={true}
                                    selectOverlap={true}
                                    eventOverlap={false}
                                    events={schedules}
                                    select={handleDateSelect}
                                    eventClick={handleRemoveEvent}
                                />
                            </div>
                        )
                    }
                    {
                        (userRoles.includes("isClient")) && (
                            <div className="lg:flex lg:h-full lg:flex-col">
                                <FullCalendar
                                    plugins={[ timeGridPlugin ]}
                                    initialView="timeGridWeek"
                                    editable={true}
                                    selectable={true}
                                    nowIndicator={true}
                                    selectMirror={true}
                                    selectOverlap={true}
                                    eventOverlap={false}
                                    events={schedules}
                                    select={handleDateSelect}
                                    eventClick={handleRemoveEvent}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}