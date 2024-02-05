"use client"

import { resetCredentials } from "@/lib/services/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ConfirmemailToken({ params }: { params: { token: string } }) {

    const dispatch = useDispatch();
    const [cookies, _, removeCookie] = useCookies(["yoken"]);
    const router = useRouter();
    const token = params.token;
    const [req, setReq] = useState(0);
    useEffect(() => {
        dispatch(resetCredentials());
        removeCookie("yoken", { path: "/" });
        // TODO: Use service
        fetch(`https://api.odicylens.com/users/token/${token}`, {
            method: "POST",
        }).then((res) => {
            setReq(res.status);
        });
    }, [dispatch, removeCookie, token]);

    const statusMessages = {
        200: {
            emoji: "🎉",
            title: "Your email has been confirmed.",
            message: "You can now login to your account."
        },
        400: {
            emoji: "🤔",
            title: "The token is invalid.",
            message: "Please check your email for the correct link."
        },
        403: {
            emoji: "🤔",
            title: "Your email has already been confirmed.",
            message: "You can now login to your account."
        },
        // TODO: Add Expired token status
    };

    // Fallback
    const defaultStatus = {
        emoji: "🤷‍♂️",
        title: "Unknown status code.",
        message: "An unknown error has occurred."
    };

    const currentStatus = statusMessages[req as keyof typeof statusMessages] || defaultStatus;

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
                    <a href="/login" className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
                        Return to Login page
                    </a>
                </div>
            )}
        </section>
    )
}