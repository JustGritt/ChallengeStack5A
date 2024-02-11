"use client"

import Link from "next/link";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { UserCookieType } from "@/types/User";
import { removeUserCookie } from "@/lib/helpers/UserHelper";
import { resetCredentials } from "@/lib/services/slices/authSlice";

export default function AffiliateCreated() {

    const dispatch = useDispatch();
    const router = useRouter();

    const handleclick = () => {
        dispatch(resetCredentials());
        removeUserCookie(UserCookieType.SESSION);
        router.push("/");
    }

    return (
        <AuthMiddleware>
            <section className="block min-h-screen">
                <div className="p-4 sm:p-6 lg:p-8 text-center m-8 bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                    <h1 className="text-9xl mb-8">
                        🤝
                    </h1>
                    <p className="text-2xl font-bold tracking-tight text-gray-900 mt-4 sm:text-4xl">
                        Thank you! <br/>
                        We are thrilled to have you join the Odicylens community.
                        Your request will soon be answered by our staff.
                    </p>

                    <Link href="/" className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring" onClick={handleclick}>
                        Return to Home page
                    </Link>
                </div>
            </section>
        </AuthMiddleware>
    )
}