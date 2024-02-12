"use client";
import { useState, useEffect } from 'react';
import BookingCalendar from '@/components/Calendar/BookingCalendar';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { string } from 'yup';
import { Button } from '@/components/Ui/Button';

export default function Page() {

    const user = useSelector(selectCurrentUser);
    const [scheduleFetched, setScheduleFetched] = useState(false);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        if (user && !scheduleFetched) {
            fetch(`https://api.odicylens.com/users/${user?.id}/schedules`, { method: "GET" })
                .then((res) => res.json())
                .then((data) => { console.log(data) });
            setScheduleFetched(true);
        }
    }, [scheduleFetched, user]);

    const data = [] as any;

    const handleDateSelect = (arg: any) => {
        const eventCategory = document.getElementById('selectedEvent') as HTMLSelectElement;
        const title = eventCategory.value;
        const calendarApi = arg.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                title,
                start: arg.start,
                end: arg.end,
                allDay: arg.allDay
            });

            data.push({
                title,
                // Replace 024-02-13T07:00:00.000Z to 2024-02-15 10:00:00
                start: arg.start.toISOString().replace('T', ' ').replace('Z', ''),
                end: arg.end.toISOString().replace('T', ' ').replace('Z', ''),
            });
        }
    }

    const handleRemoveEvent = (arg: any) => {
        if (confirm('Are you sure you want to delete this event?')) {
            arg.event.remove();
        }
    }

    const saveEvents = () => {
        data.forEach((event: any) => {
            console.log(event)
            // fetch(`https://api.odicylens.com/schedules`, {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(event)
            // })
            //     .then((res) => res.json())
            //     .then((data) => { console.log(data) });
        });
    }

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                    <div className="lg:flex lg:h-full lg:flex-col">
                        {/* <FullCalendar
                            plugins={[ timeGridPlugin, interactionPlugin ]}
                            initialView="timeGridWeek"
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'timeGridWeek,timeGridDay'
                            }}
                            expandRows={true}
                            selectable={true}
                            select={handleDateSelect}
                            eventClick={handleRemoveEvent}
                            events={data}

                        /> */}

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
                            nowIndicator={true}
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            selectOverlap={false}
                            select={handleDateSelect}
                            eventClick={handleRemoveEvent}
                            events={data}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}