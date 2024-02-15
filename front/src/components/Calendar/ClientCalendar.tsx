import FullCalendar from '@fullcalendar/react';

import toast from "react-hot-toast";
import timeGridPlugin from '@fullcalendar/timegrid'
import { useSelector } from 'react-redux';
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { useEffect, useMemo, useState } from 'react';
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';

export default function UserCalendar() {

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
        if (user && !scheduleFetched && parsedSession?.token) {
            fetch(`https://api.odicylens.com/users/${user?.id}/bookings`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${parsedSession?.token}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    const events = data["hydra:member"].map((event: any) => ({
                        title: event.title,
                        start: event.startDate,
                        end: event.endDate
                    }));
                    setSchedules(events);
                })
            setScheduleFetched(true);
        }
    }, [parsedSession?.token, scheduleFetched, user]);

    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                Your schedule
            </h2>

            <FullCalendar
                plugins={[ timeGridPlugin ]}
                initialView="timeGridWeek"
                editable={false}
                selectable={false}
                nowIndicator={true}
                eventOverlap={false}
                events={schedules}
            />
        </div>
    )
}
