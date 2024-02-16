"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { useEffect, useMemo, useState } from "react";
import { selectCurrentUserConfig } from "@/lib/services/slices/authSlice";
import { CalendarIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function History() {
  const userConfig = useSelector(selectCurrentUserConfig);
  const userRoles = useMemo(
    () =>
      Object.keys(userConfig || {}).filter(
        (role) => userConfig[role as keyof UserConfigType]
      ),
    [userConfig]
  );

  // Get session
  const [parsedSession, setParsedSession] = useState<any>({});
  useEffect(() => {
    (async () => {
      const session = await getUserCookie(UserCookieType.SESSION);
      setParsedSession(session?.token);
  
    })();
  }, [userConfig]);

  const [history, setHistory] = useState<any[]>([]);
  const [historyFetched, setHistoryFetched] = useState(false);
  useEffect(() => {
    const fetchHistory = async () => {
      if (!historyFetched && parsedSession?.token) {
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${parsedSession.user.id}/bookings`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${parsedSession?.token}` },
          }
        )
          .then((res) => res.json())
          .then((data) => setHistory(data["hydra:member"]));
        setHistoryFetched(true);
      }
    };
    fetchHistory();
  }, [historyFetched, parsedSession]);

  return (
    <section className="lg:pl-72 block min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 h-full">
        <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
          {history.length > 1 && (
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Your History
            </h2>
          )}
          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {history ? (
              history.map((booking, index) => {
                return (
                  <li key={index} className="mb-8 ms-8">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                      <CalendarIcon
                        className="w-4 h-4 text-blue-800 dark:text-blue-300"
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {booking.service.name}
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {booking.startDate.split("T")[0]}
                    </time>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                      {booking.service.description}
                    </p>
                    {userRoles.includes("isClient") && (
                      <Link
                        href={booking.store}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 mt-2"
                      >
                        <ShoppingBagIcon
                          className="w-5 h-5 me-2"
                          aria-hidden="true"
                        />
                        Link to Store
                      </Link>
                    )}
                  </li>
                );
              })
            ) : (
              <section className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                  <h1 className="text-9xl mb-8 animate-bounce">🏃</h1>
                  <strong className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Loading...
                  </strong>
                  <p className="mt-6 text-base leading-7 text-gray-600">
                    We are fetching the store data
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6 flex-col">
                    Taking too long?
                    <Link
                      href="/dashboard"
                      className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Go back
                    </Link>
                  </div>
                </div>
              </section>
            )}
          </ol>
          {history.length === 0 && (
            <section className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
              <div className="text-center">
                <strong className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  No history
                </strong>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  You haven&apos;t booked any service yet
                </p>
                <div className="mt-4 flex items-center justify-center gap-x-6 flex-col">
                  <Link
                    href="/search"
                    className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Browse Services
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
