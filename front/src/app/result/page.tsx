"use client";

import { fetcher } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';

export default function Result() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const sessionId = searchParams ? searchParams.get("session_id") : "";

    const { data, error } = useSWR(
        sessionId
            ? `/api/checkout/${sessionId}`
            : null,
        fetcher
    )

    return (
        <section className="block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 text-center m-8 bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow flex flex-col gap-6 justify-center items-center">
                <p className="text-2xl font-bold tracking-tight text-gray-900 mt-4 sm:text-4xl">
                    Payement result
                </p>
                <pre className='mt-5'>
                    {data ? JSON.stringify(data, null, 2) : (
                        <>
                            <h1 className="text-5xl animate-bounce">
                                💸
                            </h1>
                            <strong className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Loading...
                            </strong>
                        </>
                    )}
                </pre>
                <button className="mt-6 max-w-[350px] inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring" onClick={() => {
                    router.push("/dashboard");
                }}>
                    {
                        "Go to Dashboard"
                    }
                </button>
            </div>
        </section>
    )
}