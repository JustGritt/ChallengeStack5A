"use client";

import * as Yup from "yup";
import toast from "react-hot-toast";
import { Button } from "@/components/Ui/Button";
import { UserUpdateProfile, addEmployee } from "@/types/User";
import { Form, Field, FormikProvider, useFormik, ErrorMessage, FormikConfig } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentUserConfig } from "@/lib/services/slices/authSlice";
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { UserCookieType } from "@/types/User";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useParams, useRouter } from "next/navigation";
export default function NewEmployee() {

    type StoreParams = {
        storeId: string;
    };
    const params = useParams<StoreParams>();
    const storeId = params?.storeId;
    const [getStoreId, setStoreId] = useState(storeId);
    const router = useRouter();

    const user = useSelector(selectCurrentUser);
    const userConfig: { [key: string]: boolean } = useSelector(selectCurrentUserConfig);
    const [parsedSession, setParsedSession] = useState<any>({});

    useEffect(() => {
        (async () => {
            const session = await getUserCookie(UserCookieType.SESSION);
            const parsedSession = JSON.parse(session?.value || "{}");
            setParsedSession(parsedSession);
            setStoreId(getStoreId);
        })();
    }, [userConfig]);

    // Update profile
    const initialValues: addEmployee = {
        firstname: "",
        email: "",
        plainPassword: "",
        confirmPassword: "",
    };

    // Update profile
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("Firstname is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        plainPassword: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().oneOf([Yup.ref("plainPassword")], "Passwords must match"),
    });

    const onSubmitEmployee: FormikConfig<any>["onSubmit"] = (values) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${parsedSession?.token}`,
            },
            body: JSON.stringify({
                firstname: values.firstname,
                email: values.email,
                plainPassword: values.plainPassword,
                work: `/stores/${storeId}`
            })
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
                                <p className="text-sm font-medium text-gray-900">New employee added!</p>
                                <p className="mt-1 text-sm text-gray-500">
                                    The employee has been added successfully.
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

    const formikEmployee = useFormik<UserUpdateProfile>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmitEmployee,
    });

    return (
        <div className="mt-4 mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                New Employee
            </h2>
            <FormikProvider value={formikEmployee}>
                <Form id="profileFields" className="flex flex-col px-4 gap-1">
                    <div className="w-full flex flex-col justify-center items-start">
                        <label htmlFor="firstname" className="text-black text-sm font-semibold">
                            Firstname <span className="text-red-600">*</span>
                        </label>
                        <Field
                            type="text"
                            placeholder="Firstname"
                            name="firstname"
                            className="border border-gray-200 rounded px-3 py-2 placeholder-gray-400 text-black w-full"
                        />
                        <ErrorMessage name="firstname" component="span" className="text-red-600" />
                    </div>
                    <div className="w-full flex flex-col justify-center items-start">
                        <label htmlFor="email" className="text-black text-sm font-semibold">
                            Email <span className="text-red-600">*</span>
                        </label>
                        <Field
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="border border-gray-200 rounded px-3 py-2 placeholder-gray-400 text-black w-full"
                        />
                        <ErrorMessage name="email" component="span" className="text-red-600" />
                    </div>
                    <div className="w-full flex flex-col justify-center items-start">
                        <label htmlFor="plainPassword" className="text-black text-sm font-semibold">
                            Password <span className="text-red-600">*</span>
                        </label>
                        <Field
                            type="password"
                            placeholder="Password"
                            name="plainPassword"
                            className="border border-gray-200 rounded px-3 py-2 placeholder-gray-400 text-black w-full"
                        />
                        <ErrorMessage name="plainPassword" component="span" className="text-red-600" />
                    </div>
                    <div className="w-full flex flex-col justify-center items-start">
                        <label htmlFor="confirmPassword" className="text-black text-sm font-semibold">
                            Confirm Password <span className="text-red-600">*</span>
                        </label>
                        <Field
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            className="border border-gray-200 rounded px-3 py-2 placeholder-gray-400 text-black w-full"
                        />
                        <ErrorMessage name="confirmPassword" component="span" className="text-red-600" />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Button intent="default" type="submit" className="mt-4 w-full">
                            Save
                        </Button>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
}