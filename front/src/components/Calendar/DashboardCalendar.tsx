import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import { useSelector } from "react-redux";
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { useEffect, useState } from 'react';
import { selectCurrentUserConfig } from '@/lib/services/slices/authSlice';

export default function DashboardCalendar() {

    const userConfig = useSelector(selectCurrentUserConfig);
    const [bookings, setBookings] = useState<any[]>([])
    const [bookingFetched, setBookingFetched] = useState(false)

    // Get session
    const [parsedSession, setParsedSession] = useState<any>({});
    useEffect(() => {
        (async () => {
            const parsedSession = await getUserCookie(UserCookieType.SESSION);
            setParsedSession(parsedSession);
        })();
    }, [userConfig]);

    // Get bookings
    useEffect(() => {
        if (userConfig.isClient &&  parsedSession?.user?.id && !bookingFetched) {
            getUserBookings(parsedSession?.user?.id, parsedSession?.token);
        }

        if (userConfig.isWorker &&  parsedSession?.user?.id && !bookingFetched) {
            getEmployeeBookings(parsedSession?.user?.id, parsedSession?.token);
        }
    }, [parsedSession, bookingFetched, userConfig])

    const getUserBookings = (id: number, token: string) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/bookings`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => { setBookings(data["hydra:member"]) })
        setBookingFetched(true);
    }

    const getEmployeeBookings = (id: number, token: string) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/${id}/bookings`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => { setBookings(data["hydra:member"]) })
        setBookingFetched(true);
    }

    const data = bookings.map((booking) => {
        return {
            title: booking.service.name,
            start: booking.startDate,
            end: booking.endDate,
            extendedProps: {
                customer: booking.customer.email,
                employee: booking.employee.email,
            }
        }
    })

    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <FullCalendar
                plugins={[ listPlugin ]}
                initialView="listDay"
                timeZone="UTC+1"
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
