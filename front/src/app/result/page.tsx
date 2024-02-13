"use client";

import { cn, fetcher } from '@/lib/utils';
import { BooKingPost } from '@/types/Booking';
import { useRouter, useSearchParams } from 'next/navigation';
import { HydraError } from "@/types/HydraPaginateResp";
import { useToast } from "@/components/Ui/use-toast";
import useSWR from 'swr';

export default function Result() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast()

    const sessionId = searchParams ? searchParams.get("session_id") : "";

    const { data, error } = useSWR(
        sessionId
            ? `/api/checkout/${sessionId}`
            : null,
        fetcher
    )

    const createBookingServer = async (payload: BooKingPost) => {
        try {
            const res = await fetch('/api/services/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            return data;
        }
        catch (error) {
        }
    }

    if (data) {
        const intentPayment = data.payment_intent;
        if (intentPayment.status === "succeeded") {
            createBookingServer({
                employee: intentPayment.metadata.employee,
                service: intentPayment.metadata.service,
                startDate: intentPayment.metadata.startDate.toISOString(),
                amount: intentPayment.amount / 100,
            })
                .then((resp) => {
                    toast({
                        className: cn(
                            "fixed top-4 z-[100] flex max-h-screen w-full flex-col-reverse py-4 px-4 right-4  sm:flex-col md:max-w-[420px]"
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
                        ).format(new Date(intentPayment.metadata.startDate))} please don't be late`,
                        variant: "default",
                    });
                    router.push(`/dashboard/appointments`);
                })
                .catch((error: { data: HydraError }) => {
                    toast({
                        className: cn(
                            "fixed top-4 z-[100] flex max-h-screen w-full flex-col-reverse py-4 px-4 right-4  sm:flex-col md:max-w-[420px]"
                        ),
                        title: "Une erreur est survenue.",
                        description:
                            error?.data.detail ??
                            "Désolé, quelque chose ne s'est pas bien passe.",
                        variant: "destructive",
                    });
                });
        }
    }



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