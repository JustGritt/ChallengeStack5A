"use client";
import { useState, useEffect } from 'react';
import BookingCalendar from '@/components/Calendar/BookingCalendar';

export default function Page({ params }: { params: { id: string } }) {


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