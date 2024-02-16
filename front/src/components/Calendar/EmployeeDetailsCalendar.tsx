import toast from "react-hot-toast";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

import { Button } from '@/components/Ui/Button';
import { useSelector } from 'react-redux';
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useEffect, useMemo, useState } from 'react';
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';

export default function EmployeeDetailsCalendar({ employeeId, employeeStore }: { employeeId: string, employeeStore: string }) {

    const [newSchedules, setNewSchedules] = useState<any[]>([]);
    const [scheduleFetched, setScheduleFetched] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [scheduleToDelete, setScheduleToDelete] = useState<string[]>([]);

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
        if (user && !scheduleFetched && employeeId && parsedSession?.token) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${employeeId}/schedules`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${parsedSession?.token}`
                }
            })
            .then((res) => res.json())
            .then((data) => {
                    const events = data["hydra:member"].map((event: any) => ({
                        title: event.onVacation ? "Vacation" : event.refused ? "Vacation refused (Work)" : "Work",
                        start: event.startDate,
                        end: event.endDate,
                        extendedProps: { scheduleId: event.id },
                        backgroundColor: event.onVacation ? "#6a994e" : event.refused ? "#c1121f" : null
                    }));
                    setSchedules(events);
                })
            setScheduleFetched(true);
        }
    }, [employeeId, parsedSession?.token, scheduleFetched, user]);

    const [bookings, setBookings] = useState<any[]>([]);
    const [bookingsFetched, setBookingsFetched] = useState(false);

    // Get the bookings
    useEffect(() => {
        if (user && !bookingsFetched && employeeId) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/${employeeId}/bookings`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    const bookingEvents = data["hydra:member"].map((event: any) => ({
                        title: "Booking",
                        start: event.startDate,
                        end: event.endDate,
                        backgroundColor: "#6a994e",
                        extendedProps: {
                            scheduleId: event.id
                        }
                    }));
                    setBookings(bookingEvents);
                })
            setBookingsFetched(true);
        }
    }, [bookingsFetched, user, employeeId]);

    const handleDateSelect = (arg: any) => {
        const eventCategory = document.getElementById('selectedEvent') as HTMLSelectElement;
        const title = eventCategory.value;
        const calendarApi = arg.view.calendar;
        calendarApi.unselect();

        // If there are events at the same time, prevent the user from adding a new one
        if(calendarApi.getEvents().some((event: any) => { return (arg.start >= event.start && arg.start <= event.end) || (arg.end >= event.start && arg.end <= event.end) })) {
            toast.error("You can't add an event at the same time as another one.\n(30 minutes of rest between each event)");
            return;
        }

        // If the title is not empty and the difference between the start and end date is below 10 hours
        if(title === "Work" && (arg.end - arg.start) / 1000 / 60 / 60 > 10) {
            toast.error("You can't work more than 10 hours at once");
            return;
        }

        // If a schedule is set before 9am or after 7pm, prevent the user from saving the events
        if(new Date(arg.start).getHours() <= 9 || new Date(arg.end).getHours() > 19) {
            toast.error("You can't work before 9am or after 7pm");
            return;
        }

        // If the user has deleted an event, prevent the user from adding a new one
        if(scheduleToDelete.length > 0) {
            toast.error("You deleted an event, please save your changes before adding a new one");
            return;
        }

        if (title) {
            calendarApi.addEvent({
                title,
                start: arg.start,
                end: arg.end,
                allDay: arg.allDay
            });

            setNewSchedules([...newSchedules, {
                title,
                start: arg.start.toISOString().replace('T', ' ').replace('Z', '').split('.')[0],
                end: arg.end.toISOString().replace('T', ' ').replace('Z', '').split('.')[0]
            }]);
        }
    }

    const handleRemoveEvent = (arg: any) => {
        if(arg.event.title === "Booking") {
            toast.error("You can't delete a booking event");
            return;
        }

        const eventStart = arg.event.start.toISOString().replace('Z', '').split('.')[0];
        const isBookingConflict = bookings.some((booking: any) => {
            const bookingStart = booking.start.split("+")[0];
            const bookingEnd = booking.end.split("+")[0];
            return eventStart >= bookingStart && eventStart <= bookingEnd;
        });

        if (isBookingConflict) {
            toast.error("You can't delete a work event if a booking is in the same time interval");
            return;
        }

        if (confirm('Are you sure you want to delete this event?')) {
            arg.event.remove();

            // If the schedule is in the data array, remove it
            newSchedules.map((schedule: any, index: number) => {
                if(schedule.start === arg.event.start.toISOString().replace('T', ' ').replace('Z', '').split('.')[0]) {
                    newSchedules.splice(index, 1);
                }
            });

            // Get the schedule to delete
            schedules.map((schedule: any) => {
                if(schedule.start.split("+")[0] === arg.event.start.toISOString().replace('Z', '').split('.')[0]) {
                    setScheduleToDelete([...scheduleToDelete, schedule.extendedProps.scheduleId]);
                }
            });

        }
    }

    // Save events as Owner
    const saveEvents = async () => {
        if(userRoles.includes("isOwner")) {
            // Delete schedules
            for (const id of scheduleToDelete) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${parsedSession?.token}`
                    }
                });

                if(res.status === 204) {
                    toast.custom((t) => (
                        <div aria-live="assertive" className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
                            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                                <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="p-4">
                                    <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <CheckIcon className="w-6 h-6 text-green-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">
                                            The events have been deleted
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            You might have to reload the page to see the changes
                                        </p>
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0">
                                        <button type="button" className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    ));
                } else {
                    toast.error("An error occured while deleting the event");
                }
            }

            const postPromises = newSchedules.map((event: any) => {
                return fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${parsedSession?.token}`
                    },
                    body: JSON.stringify({
                        startDate: event.start,
                        endDate: event.end,
                        onVacation: event.title === "Vacation",
                        employee: `users/${employeeId}`,
                        store: `stores/${employeeStore}`
                    })
                });
            });

            try {
                await Promise.all(postPromises);
                toast.custom((t) => (
                    <div aria-live="assertive" className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
                        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="p-4">
                                <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <CheckIcon className="w-6 h-6 text-green-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-gray-900">
                                        The events have been saved
                                    </p>
                                </div>
                                <div className="ml-4 flex flex-shrink-0">
                                    <button type="button" className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="sr-only">Close</span>
                                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                ))
            } catch (err) {
                console.error(err);
                toast.error("An error occured while saving the event");
            }

            // Reload page if any schedules were deleted
            if(scheduleToDelete.length > 0) {
                setScheduleToDelete([]);
                window.location.reload();
            }
        }
    }

    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                Employee schedule
            </h2>
            {
                userRoles.includes("isOwner") ? (
                    <section>
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
                            timeZone='UTC+1'
                            selectable={true}
                            allDaySlot={false}
                            nowIndicator={true}
                            selectMirror={true}
                            selectOverlap={true}
                            eventOverlap={false}
                            slotMinTime="07:00:00"
                            slotMaxTime="21:00:00"
                            businessHours={{
                                daysOfWeek: [ 0, 1, 2, 3, 4, 5, 6 ],
                                startTime: '09:00',
                                endTime: '19:00'
                            }}
                            events={(schedules as any[]).concat(bookings as any[])}
                            select={handleDateSelect}
                            eventClick={handleRemoveEvent}
                        />
                    </section>
                ) : (
                    <FullCalendar
                        plugins={[ timeGridPlugin, interactionPlugin ]}
                        initialView="timeGridWeek"
                        timeZone='UTC+1'
                        allDaySlot={false}
                        eventOverlap={false}
                        slotMinTime="07:00:00"
                        slotMaxTime="21:00:00"
                        businessHours={{
                            daysOfWeek: [ 0, 1, 2, 3, 4, 5, 6 ],
                            startTime: '09:00',
                            endTime: '19:00'
                        }}
                        events={(schedules as any[]).concat(bookings as any[])}
                    />
                )
            }
        </div>
    )
}
