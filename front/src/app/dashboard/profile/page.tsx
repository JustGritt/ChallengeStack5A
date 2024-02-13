"use client";

import * as Yup from "yup";
import toast from "react-hot-toast";
import { Button } from "@/components/Ui/Button";
import { UserUpdateProfile } from "@/types/User";
import { Form, Field, FormikProvider, useFormik, ErrorMessage, FormikConfig } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentUserConfig } from "@/lib/services/slices/authSlice";
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function EditProfile() {

    // Update profile
    const initialProfileValues: UserUpdateProfile = {
        firstname: "",
        plainPassword: "",
        confirmPassword: ""
    };
    const user = useSelector(selectCurrentUser);
    const userConfig = useSelector(selectCurrentUserConfig);
    const [parsedSession, setParsedSession] = useState<any>({});


    // Update profile
    const validationProfileSchema = Yup.object().shape({
        firstname: Yup.string().required("Required"),
        plainPassword: Yup.string().required("Required").min(6, "Password must be at least 6 characters"),
        confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("plainPassword"), ""], "Passwords must match"),
    });

    const onSubmitProfile: FormikConfig<UserUpdateProfile>["onSubmit"] = (values) => {
        fetch(`https://api.odicylens.com/users/${user?.id}`, {
            method: "PATCH",
            headers: { 'Authorization': `Bearer ${parsedSession?.token}`, 'Content-Type': 'application/merge-patch+json' },
            body: JSON.stringify(values)
        })
        .then((res) => res.json())
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
                                <p className="text-sm font-medium text-gray-900">Profile Updated!</p>
                                <p className="mt-1 text-sm text-gray-500">
                                    The changes will be applied on your next login.
                                </p>
                            </div>
                            <div className="ml-4 flex flex-shrink-0">
                                <button type="button" className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
        })
    };

    const formikProfile = useFormik<UserUpdateProfile>({
        initialValues: initialProfileValues,
        validationSchema: validationProfileSchema,
        onSubmit: onSubmitProfile,
    });

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                        Update profile
                    </h2>
                    <FormikProvider value={formikProfile}>
                        <Form id="profileFields" className="flex flex-col px-4 gap-1">
                            <div className="flex justify-between w-full items-center">
                                <label htmlFor="firstname" className="text-black text-sm font-semibold">
                                    First Name <span className="text-red-600">*</span>
                                </label>
                                <ErrorMessage name="firstname" component="span" className="text-red-600 leading-3 text-sm" />
                            </div>
                            <Field type="text" placeholder="First Name" name="firstname" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm " />

                            <div className="sm:grid sm:grid-cols-2 gap-4 w-full mt-4">
                                <div className="flex w-full flex-col">
                                    <label htmlFor="password" className="text-black text-sm font-semibold">
                                        Password <span className="text-red-600">*</span>
                                    </label>
                                    <ErrorMessage name="password" component="span" className="text-red-600 leading-3 text-sm" />
                                    <Field type="password" placeholder="Password" name="plainPassword" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full" />
                                </div>

                                <div className="flex w-full flex-col">
                                    <label htmlFor="confirmPassword" className="text-black text-sm font-semibold">
                                        Confirm Password <span className="text-red-600">*</span>
                                    </label>
                                    <ErrorMessage name="confirmPassword" component="span" className="text-red-600 leading-3 text-sm" />
                                    <Field type="password" placeholder="Confirm Password" name="confirmPassword" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full" />
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center gap-2">
                                <Button intent="default" type="submit" className="mt-4 w-full">
                                    Save changes
                                </Button>
                            </div>
                        </Form>
                    </FormikProvider>
                </div>
            </div>
        </section>
    );
}
