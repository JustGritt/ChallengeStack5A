"use client";
import { useState, useEffect } from 'react';

export default function ConfirmUser() {
    const [countdown, setCountdown] = useState(5);
    useEffect(() => {
        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
            if (countdown <= 0) window.location.href = "/login";
        }, 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    return (
        <section className="min-h-screen bg-gray-100 dark:bg-slate-700 grid place-items-center">
            <div className="block max-w-[70vw] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-8 pt-8 pb-16">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Your account have been validated</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    You will be redirected to the login page in {countdown} seconds.
                </p>
            </div>
        </section>
    )
}
