"use client";
import { useState, useEffect } from 'react';
import BookingCalendar from '@/components/Calendar/BookingCalendar';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";

export default function Page() {

    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        if (user) {
            fetch(`https://api.odicylens.com/users/${user?.id}/schedules`, { method: "GET" })
                .then((res) => res.json())
                .then((data) => { console.log(data) });
        }
    }, [user]);


    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                    <BookingCalendar />
                </div>
            </div>
        </section>
    )
}