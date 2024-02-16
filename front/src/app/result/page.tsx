"use client";

import { cn, fetcher } from '@/lib/utils';
import { BooKingPost } from '@/types/Booking';
import { useRouter, useSearchParams } from 'next/navigation';
import { HydraError } from "@/types/HydraPaginateResp";
import { useToast } from "@/components/Ui/use-toast";
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { getUserCookie } from '@/lib/helpers/UserHelper';
import { UserCookieType } from '@/types/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCross, faFaceAngry, faSadCry, faSadTear, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { removeKeyCookie, removeUserCookie } from "@/lib/helpers/UserHelper";
import Link from 'next/link';
import { selectCurrentUser } from '@/lib/services/slices/authSlice';
import { useSelector } from 'react-redux';

export default function Result() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast()

    const sessionId = searchParams ? searchParams.get("session_id") : "";

    const user = useSelector(selectCurrentUser);

    const [callError, setCallError] = useState<string | null>(null);

    const { data, error } = useSWR(
        sessionId
            ? `/api/checkout/${sessionId}`
            : null,
        fetcher
    )

    const handleClick = () => {
        if (data?.session.payment_status === "paid" && data?.session.payment_intent.status === "succeeded") {
            router.push(`/dashboard`);
        } else {
            router.back();
        }
    }

    const createBookingServer = async (payload: BooKingPost) => {
        let session;
        try {
            session = await getUserCookie(UserCookieType.SESSION);
            // console.log("🚀 ~ createBookingServer ~ session:", session);
        } catch (error) {
            throw new Error('Failed to retrieve user session');
        }
    
        try {
            const res = await fetch('/api/services/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`,
                },
                body: JSON.stringify(payload),
            });
    
            // Check if the response is ok (status in the range 200-299).
            if (!res.ok) {
                const data = await res.json(); // Attempt to read the response body.
                const errorMessage = data.detail || 'An unknown error occurred during booking';
                throw new Error(errorMessage);
            }
    
            const data = await res.json();
            return data; // Assuming 201 is the only success code, otherwise check for res.status === 201 explicitly if needed.
        } catch (error: any) {
            // Re-throwing the error to be handled by the caller.
            console.error("Error in createBookingServer:", error);
            throw new Error(typeof error === 'string' ? error : (error).message || 'Error occurred during booking process');
        }
    };
    // console.log(data)
    // useEffect(() => {
    // })
    useEffect(() => {
        window.history.replaceState({}, document.title, window.location.pathname)
        if (data) {
            const { session } = data
            if (session.payment_status === "paid" && session.payment_intent) {
                const intentPayment = session.payment_intent;
                createBookingServer({
                    employee: session.metadata.employee,
                    service: session.metadata.service,
                    startDate: new Date(session.metadata.startDate).toISOString(),
                    amount: intentPayment.amount / 100,
                } as BooKingPost)
                    .then((resp) => {
                        removeKeyCookie("collaboratorChoosen");
                        removeKeyCookie("dateRdv");
                        toast({
                            className: cn(
                                "fixed top-4 z-[100] flex max-h-screen w-full flex-col-reverse py-4 px-4 right-4 sm:flex-col md:max-w-[420px]"
                            ),
                            title: `Booking successfully created`,
                            description: `You've now a meet for ${new Intl.DateTimeFormat(
                                "en-FR",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    weekday: "long",
                                }
                            ).format(new Date(session.metadata.startDate))} please don't be late`,
                            variant: "default",
                        });
                        router.push(`/dashboard/appointments`);
                    })
                    .catch((error) => {
                        // console.log("🚀 ~ useEffect ~ error:", error)
                        const errorMessage = error instanceof Error ? error.message : String(error) || "Désolé, quelque chose ne s'est pas bien passe.";
                        setCallError(errorMessage);
                        toast({
                            className: cn(
                                "fixed top-4 z-[100] flex max-h-screen w-full flex-col-reverse py-4 px-4 right-4  sm:flex-col md:max-w-[420px]"
                            ),
                            title: "Une erreur est survenue.",
                            description:
                                (errorMessage) ??
                                "Désolé, quelque chose ne s'est pas bien passe.",
                            variant: "destructive",
                        });
                    });
            }
        }
    }, [data])



    return (
        <section className="flex justify-center items-center min-h-screen w-full">
            <div className="w-[50%] p-4 sm:p-6 lg:p-8 text-center m-8 bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow flex flex-col gap-6 justify-center items-center">
                <pre className='mt-5'>
                    {data ? (
                        <pre>
                            {
                                (data.session.payment_status === "paid"
                                    && data.session.payment_intent.status === "succeeded") && !callError ? (
                                    <div className='flex flex-col justify-center gap-2'>
                                        <FontAwesomeIcon className="text-green-500 text-9xl animate-pulse" icon={faCheckCircle} />
                                        <strong className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                            Payment successful
                                        </strong>
                                        <span>
                                            The payment has been successfully processed, your booking is being created
                                        </span>
                                    </div>
                                ) : 
                                (data.session.payment_status === "paid"
                                && data.session.payment_intent.status === "succeeded") && callError ? (
                                    <div className='flex flex-col justify-center gap-2'>
                                        <FontAwesomeIcon className="text-yellow-500 text-9xl animate-pulse" icon={faSadTear} />
                                        <strong className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                            Payment failed
                                        </strong>
                                        <span>
                                            {callError}
                                            <br />
                                            A refund will be issued shortly
                                        </span>
                                    </div>
                                )
                                : (
                                    <div className='flex flex-col justify-center gap-2'>
                                        <FontAwesomeIcon className="text-red-500 text-9xl animate-pulse" icon={faXmarkCircle} />
                                        <strong className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                            Payment failed
                                        </strong>
                                        <span>
                                            Your payment has failed, please try again later
                                        </span>
                                    </div>
                                )
                            }
                        </pre>
                    ) : (
                        <pre>
                            <div className='flex flex-col justify-center gap-2'>
                                <h1 className="text-9xl animate-bounce">
                                    💸
                                </h1>
                                <strong className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    Processing your payment
                                </strong>
                                <span>
                                    Please wait a moment
                                </span>
                            </div>
                        </pre>
                    )}
                </pre>
                <button className="max-w-[350px] inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring" onClick={handleClick}>
                    {
                        data?.session.payment_status === "paid" && data?.session.payment_intent.status === "succeeded" ? "Go to dashboard" : "Try again"
                    }
                </button>
                {
                    data?.session.payment_status === "unpaid" && !data?.session.payment_intent && (
                        <Link href={`/`} className='underline text-indigo-600 cursor-pointer'>
                            Go back to home
                        </Link>
                    )
                }
            </div>
        </section>
    )
}