"use client";

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';

import UserCalendar from "@/components/Calendar/EmployeeCalendar";
import EmployeeTableCalendar from "@/components/Calendar/EmployeeTableCalendar";
import ClientCalendar from "@/components/Calendar/ClientCalendar";
import { getUserCookie } from '@/lib/helpers/UserHelper';
import { UserCookieType } from '@/types/User';

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
                    {
                        userRoles.includes("isOwner") && (
                            <div className="lg:flex lg:h-full lg:flex-col">
                                <EmployeeTableCalendar />
                            </div>
                        )
                    }

                    {
                        (userRoles.includes("isWorker")) && (
                            <div className="lg:flex lg:h-full lg:flex-col">
                                <UserCalendar />
                            </div>
                        )
                    }

                    {
                        (userRoles.includes("isClient")) && (
                            <div className="lg:flex lg:h-full lg:flex-col">
                                <ClientCalendar />
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
