"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ConfirmemailToken({ params }: { params: { token: string } }) {

    const [req, setReq] = useState(0);
    useEffect(() => {
        fetch(`https://api.odicylens.com/users/token/${params.token}`, { method: "GET", }).then((res) => { setReq(res.status) });
    }, [params.token]);

    const statusMessages = {
        200: {
            emoji: "🎉",
            title: "Your email has been confirmed.",
            message: "You can now login to your account.",
            buttonUrl: "/login",
        },
        400: {
            emoji: "🤔",
            title: "The token is invalid or has expired.",
            message: "Please request a new confirmation email by clicking the button below.",
            buttonUrl: "/reset-token",
        },
        403: {
            emoji: "🤔",
            title: "Your email has already been confirmed.",
            message: "You can now login to your account.",
            buttonUrl: "/login",
        }
    };

    const currentStatus = statusMessages[req as keyof typeof statusMessages];

    return (
        <section className="block min-h-screen">
            {currentStatus && (
                <div className="p-4 sm:p-6 lg:p-8 text-center m-8 bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                    <h1 className="text-9xl mb-8">
                        {currentStatus.emoji}
                    </h1>
                    <p className="text-2xl font-bold tracking-tight text-gray-900 mt-4 sm:text-4xl">
                        {currentStatus.title}
                    </p>
                    <p className="mt-4 text-gray-500">
                        {currentStatus.message}
                    </p>
                    <Link href={currentStatus.buttonUrl} className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
                        {currentStatus.buttonUrl === "/reset-token" ? "Request new confirmation email" : "Login"}
                    </Link>
                </div>
            )}
        </section>
    )
}