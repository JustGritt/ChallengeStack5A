"use client";

import BookingCalendar from "@/components/Calendar/BookingCalendar";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { string } from "yup";
import { Button } from "@/components/Ui/Button";

import Link from "next/link";
import Breadcrumb from "@/components/Header/Breadcrumb";
import { Company } from "@/types/Company";
import { Employee } from "@/types/User";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  selectCurrentUser,
  selectCurrentUserConfig,
} from "@/lib/services/slices/authSlice";
import {
  CheckIcon,
  IdentificationIcon,
  UserIcon,
  HomeModernIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import toast from "react-hot-toast";

export default function Page() {
  const data: {
    title: string;
    start: any;
    end: any;
  }[] = [];

  const [scheduleFetched, setScheduleFetched] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const user = useSelector(selectCurrentUser);
  const userConfig = useSelector(selectCurrentUserConfig);
  const userRoles = useMemo(
    () =>
      Object.keys(userConfig).filter(
        (role) => !!userConfig[role as keyof typeof userConfig]
      ),
    [userConfig]
  );

  // Get session
  const [parsedSession, setParsedSession] = useState<any>({});
  useEffect(() => {
    (async () => {
      const parsedSession = await getUserCookie(UserCookieType.SESSION);
      setParsedSession(parsedSession);
    })();
  }, []);

  useEffect(() => {
    if (user && !scheduleFetched) {
      fetch(`https://api.odicylens.com/users/${user?.id}/schedules`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          const events = data["hydra:member"].map((event: any) => ({
            title: event.onVacation ? "Vacation" : "Work",
            start: event.startDate,
            end: event.endDate,
          }));

          console.log(events);
          // setSchedules(events);
        });
      setScheduleFetched(true);
    }
  }, [scheduleFetched, user]);

  const handleDateSelect = (arg: any) => {
    const eventCategory = document.getElementById(
      "selectedEvent"
    ) as HTMLSelectElement;
    const title = eventCategory.value;
    const calendarApi = arg.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        title,
        start: arg.start,
        end: arg.end,
        allDay: arg.allDay,
      });

      data.push({
        title,
        // Replace 2024-02-13T07:00:00.000Z to 2024-02-15 10:00:00
        start: arg.start.toISOString().replace("T", " ").replace("Z", ""),
        end: arg.end.toISOString().replace("T", " ").replace("Z", ""),
      });
    }
  };

  const handleRemoveEvent = (arg: any) => {
    if (confirm("Are you sure you want to delete this event?")) {
      arg.event.remove();
    }
  };

  const saveEvents = () => {
    data.forEach((event: any) => {
      console.log(event);
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
  };

  return (
    <section className="lg:pl-72 block min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 h-full">
        <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
          {(userRoles.includes("isOwner") ||
            userRoles.includes("isWorker")) && (
            <div className="lg:flex lg:h-full lg:flex-col">
              <div className="flex justify-center items-center mb-8">
                <select
                  id="selectedEvent"
                  className="flex-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultValue="work">Work</option>
                  <option defaultValue="vacation">Vacation</option>
                </select>

                <Button
                  onClick={() => saveEvents()}
                  className="flex-none flex-2 ml-4"
                >
                  Save events
                </Button>
              </div>

              <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
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
          )}
        </div>
      </div>
    </section>
  );
}
