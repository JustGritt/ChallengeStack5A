"use client"

import { resetCredentials } from "@/lib/services/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

export default function ConfirmEmail() {

    const dispatch = useDispatch();
    const [cookies, _, removeCookie] = useCookies(["yoken"]);
    const router = useRouter();
    useEffect(() => {
        dispatch(resetCredentials());
        removeCookie("yoken", { path: "/" });
        router.push("/login");
    }, [dispatch, removeCookie, router]);

    return (
        <section className="block min-h-screen">
                <div className="p-4 sm:p-6 lg:p-8 text-center m-8 bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                    <h1 className="text-9xl mb-8">
                        👻
                    </h1>
                    <p className="text-2xl font-bold tracking-tight text-gray-900 mt-4 sm:text-4xl">
                        The page you are looking for does not exist.
                    </p>
                    <p className="mt-4 text-gray-500">
                        If you are not redirected to the Login page, click the button below.
                    </p>
                    <a href="/login" className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
                        Return to Login page
                    </a>
                </div>
        </section>
    )
}