"use client";

import * as Yup from "yup";
import toast from "react-hot-toast";
import { Button } from "@/components/Ui/Button";
import { UserUpdateProfile } from "@/types/User";
import { Form, Field, FormikProvider, useFormik, ErrorMessage, FormikConfig } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentUserConfig } from "@/lib/services/slices/authSlice";
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useParams, useRouter } from "next/navigation";
import { Service } from "@/types/Service";
import { usePatchServiceMutation } from "@/lib/services/services";
export default function UpdateService() {
    type RouteParams = {
        serviceId: string;
    };

    const { serviceId } = useParams<RouteParams>() || {};
    const router = useRouter();

    const user = useSelector(selectCurrentUser);
    const userConfig = useSelector(selectCurrentUserConfig);
    const [parsedSession, setParsedSession] = useState<any>({});

    useEffect(() => {
        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            setParsedSession(session);
        })();
    }, [userConfig]);

    const initialValues: Partial<Service> = {
        name: "",
        time: 0,
        price: 0,
        description: "",
    };

    // Update service
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Service name is required"),
        time: Yup.number().required("Time is required").min(30, "Time must be at least 30 minutes").max(480, "Time must be at most 8 hours").integer("Time must be a multiple of 30").positive("Time must be a positive number").test("is-multiple-of-30", "Time must be a multiple of 30", value => value % 30 === 0),
        price: Yup.number().required("Price is required").min(0, "Price must be at least 0").max(1000, "Price must be at most 1000").integer("Price must be a positive number").positive("Price must be a positive number"),
        description: Yup.string().required("Service description is required")
    });

    const onSubmitService: FormikConfig<any>["onSubmit"] = (values) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/merge-patch+json",
                "Authorization": `Bearer ${parsedSession?.token}`,
            },
            body: JSON.stringify({
                name: values.name,
                time: values.time,
                price: values.price,
                description: values.description,
            })
        })
            .then(res => res.json())
            .then(() => {
                toast.custom((t) => (
                    <div aria-live="assertive" className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
                        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <CheckIcon className="w-6 h-6 text-green-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3 w-0 flex-1 pt-0.5">
                                            <p className="text-sm font-medium text-gray-900">Service updated</p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Your service has been up updated successfully.
                                            </p>
                                        </div>
                                        <div className="ml-4 flex flex-shrink-0">
                                            <button onClick={() => { toast.dismiss(t.id) }} type="button" className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                <span className="sr-only">Close</span>
                                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ));
                router.back()
            })
    };

    const formikService = useFormik<Partial<Service>>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmitService,
    });

    return (
        <div className="mt-4 mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                Edit service
            </h2>
            <FormikProvider value={formikService}>
                <Form id="profileFields" className="flex flex-col px-4 gap-1">

                    <div className="flex w-full flex-col">
                        <label htmlFor="name" className="text-black text-sm font-semibold">
                            Service name <span className="text-red-600">*</span>
                        </label>
                        <ErrorMessage name="name" component="span" className="text-red-600 leading-3 text-sm" />
                        <Field type="text" placeholder="Your service" name="name" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full" />
                    </div>

                    <div className="sm:grid sm:grid-cols-2 gap-4 w-full mt-4">
                        <div className="flex w-full flex-col">
                            <label htmlFor="time" className="text-black text-sm font-semibold inline">
                                Time <span className="text-red-600">*</span>
                                <ErrorMessage name="time" component="span" className="ml-4 text-red-600 leading-3 text-sm" />
                            </label>
                            <Field type="number" placeholder="Your service" name="time" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full" step={30} min={30} />
                        </div>

                        <div className="flex w-full flex-col">
                            <label htmlFor="price" className="text-black text-sm font-semibold">
                                Price (€) <span className="text-red-600">*</span>
                            </label>
                            <ErrorMessage name="price" component="span" className="text-red-600 leading-3 text-sm" />
                            <Field type="number" placeholder="50" name="price" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full" />
                        </div>
                    </div>

                    <div className="flex w-full flex-col mt-4">
                        <label htmlFor="description" className="text-black text-sm font-semibold">
                            Service description <span className="text-red-600">*</span>
                        </label>
                        <ErrorMessage name="description" component="span" className="text-red-600 leading-3 text-sm" />
                        <Field type="text" placeholder="Your service description" name="description" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full" />
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2">
                        <Button intent="default" type="submit" className="mt-4 w-full">
                            Save changes
                        </Button>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
}