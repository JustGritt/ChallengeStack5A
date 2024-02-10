"use client";

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/lib/services/slices/authSlice';

export default function Company() {

    const user = useSelector(selectCurrentUser);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    {
                        user?.companie ? (
                            <section>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                                        {user?.companie.name} - Edit preferences
                                    </h3>


                                </div>
                            </section>
                        ) : null
                    }
                </div>
            </div>
        </section>
    )
}
