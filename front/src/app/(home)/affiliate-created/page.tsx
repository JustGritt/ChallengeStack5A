"use client"

import { removeUserCookie } from "@/lib/helpers/UserHelper";
import { resetCredentials, selectCurrentUser } from "@/lib/services/slices/authSlice";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { UserCookieType } from "@/types/User";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AffiliateCreated() {

    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        dispatch(resetCredentials());
        removeUserCookie(UserCookieType.SESSION);
    }, [dispatch, router, user]);

    const handleclick = () => {
        if (user?.companie?.isValid) {
            router.push("/dashboard");
        } else {
            router.push("/");
        }
    }

    return (
        <section className="block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 text-center m-8 bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                <h1 className="text-9xl mb-8">
                    🤝
                </h1>
                {
                    user?.companie?.isValid ? (
                        <p className="text-2xl font-bold tracking-tight text-gray-900 mt-4 sm:text-4xl">
                            Thank you! <br />
                            Your request has been approved.
                        </p>
                    ) : (
                        <p className="text-2xl font-bold tracking-tight text-gray-900 mt-4 sm:text-4xl">
                            Thank you! <br />
                            we are thrilled to have you join the Odicylens community.<br />
                            Your request is awaiting staff review.
                        </p>
                    )
                }
                <a className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring" onClick={handleclick}>
                    {
                        user?.companie?.isValid ? "Go to Dashboard" : "Return Home"
                    }
                </a>
            </div>
        </section>
    )
}