"use client";
import { useState, useEffect } from 'react';
import UserCalendar from '@/components/Calendar/UserCalendar';
export default function Page({ params }: { params: { id: string } }) {

    // TODO: Get user/me from the API
    interface User {
        id: number;
        name: string;
        email: string;
        phone: string;
    }

    const [userInfos, setUserInfos] = useState<User | null>(null);
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
            .then(response => response.json())
            .then(data => setUserInfos(data));
    }, [params.id]);

    return (
        <section className="lg:pl-72 block min-h-screen bg-gray-100 dark:bg-slate-700">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                    <p className="text-2xl font-medium text-gray-900 dark:text-white">Employee #{params.id}</p>
                    <p className="font-medium text-gray-500 dark:text-gray-400">Name: {userInfos?.name}</p>
                    <p className="font-medium text-gray-500 dark:text-gray-400">Email: {userInfos?.email}</p>
                    <p className="font-medium text-gray-500 dark:text-gray-400">Phone: {userInfos?.phone}</p>
                </div>

                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl my-8 shadow">
                    <UserCalendar />
                </div>
            </div>
        </section>
    )
}