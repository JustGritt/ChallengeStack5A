import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import { useEffect, useState } from 'react';
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { selectCurrentUserConfig } from '@/lib/services/slices/authSlice';
import { useSelector } from "react-redux";

export default function UserCalendar() {

    const userConfig: { [key: string]: boolean } = useSelector(selectCurrentUserConfig);
    const [userRoles, setUserRoles] = useState<string[]>([]);
    const [bookings, setBookings] = useState<any[]>([])
    const [bookingFetched, setBookingFetched] = useState(false)

    // Get session
    const [parsedSession, setParsedSession] = useState<any>({});
    useEffect(() => {
        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            const parsedSession = JSON.parse(session?.value || "{}");
            setParsedSession(parsedSession);
            setUserRoles(Object.keys(userConfig).filter(key => (userConfig as any)[key] === true))
        })();
    }, [userConfig]);

    // Get bookings
    useEffect(() => {
        if (parsedSession?.user?.id && !bookingFetched) {
            getBookings(parsedSession?.user?.id);
            console.log("bookings", bookings)
        }
    }, [parsedSession, bookingFetched])

    const getBookings = (id: number) => {
        fetch(`https://api.odicylens.com/users/${parsedSession?.user?.id}/bookings`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${parsedSession?.token}`
            }
        })
            .then((res) => res.json())
            .then((data) => { setBookings(data["hydra:member"]) })
        setBookingFetched(true);
    }

    // const data = [
    //     {
    //         title: 'Work',
    //         start: '2024-02-04T08:00:00.347Z',
    //         end: '2024-02-04T11:00:35.347Z'
    //     },
    // ]

    const data = bookings.map((booking) => {
        return {
            title: booking.service.name,
            start: booking.startDate,
            end: booking.endDate,
        }
    })


    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <FullCalendar
                plugins={[ listPlugin ]}
                initialView="listDay"
                events={data}
                headerToolbar={{
                    start: 'title',
                    end: 'prev,next today',
                }}
                height={'200px'}
            />
        </div>
    )
}
