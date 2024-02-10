"use client";

import {  removeUserCookie } from "@/lib/helpers/UserHelper";
import { resetCredentials } from "@/lib/services/slices/authSlice";
import { UserCookieType } from "@/types/User";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Logout() {
	const dispatch = useDispatch();
	const router = useRouter();
	useEffect(() => {
		dispatch(resetCredentials());
		removeUserCookie(UserCookieType.SESSION);
		router.push("/login");
	}, [dispatch, router]);

	return (
		<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<h1 className="text-9xl mb-8">
					👋
				</h1>
				<strong className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					See you soon!
				</strong>
				<p className="mt-6 text-base leading-7 text-gray-600">
					You have been logged out of your account.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<a href="/login"
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Go back home
					</a>
				</div>
			</div>
		</main>
	);
}
