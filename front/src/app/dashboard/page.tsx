"use client";
import DashboardCalendar from '@/components/Calendar/DashboardCalendar';

export default function Dashboard() {
    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                    <DashboardCalendar />
                </div>
            </div>
        </section>
    )
}
