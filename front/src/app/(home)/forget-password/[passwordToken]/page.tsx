"use client"

import * as Yup from "yup";
import toast from "react-hot-toast";
import { Button } from "@/components/Ui/Button";
import { useRouter } from "next/navigation";
import { UserPassword } from "@/types/User";
import { useEffect, useState } from "react";
// import { useResetPasswordMutation } from "@/lib/services/reset"; // TODO: Move the call to services
import { Form, Field, FormikProvider, useFormik, ErrorMessage, FormikConfig } from "formik";

export default function ConfirmemailToken({ params }: { params: { token: string } }) {

    const initialValues: UserPassword = {
        plainPassword: "",
        confirmPassword: "",
    };

    const router = useRouter();
    // const [ resetPassword, { isLoading } ] = useResetPasswordMutation(); // TODO: Move the call to services

    const resetPassword = async (data: { password: string, token: string }) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data.password === "password") {
                    resolve({ data: { message: "Password reset" } });
                } else {
                    reject({ data: { message: "An error occured" } });
                }
            }, 1000);
        });
    }

    const validationSchema = Yup.object().shape({
        plainPassword: Yup.string().required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref("plainPassword")], "Passwords must match"),
    });

    const onSubmit: FormikConfig<UserPassword>["onSubmit"] = (values) => {
        resetPassword({ password: values.plainPassword, token: params.token })
        .then((res) => {
            router.push("login");
            toast.custom((t) => (
                <div className={`${"animate-enter"} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`} >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    New password saved
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    You can now login to your account with your new password.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button onClick={() => { toast.dismiss(t.id) }} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Close
                        </button>
                    </div>
                </div>
            ));
        })
        .catch((registerError) => {
            toast.error(registerError.data.message);
        });
    };

    const formik = useFormik<UserPassword>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    const [req, setReq] = useState(0);
    useEffect(() => {
        fetch(`https://api.odicylens.com/users/token/${params.token}`, { method: "GET", }).then((res) => { setReq(res.status) });
    }, [params.token]);

    const statusMessages = {
        200: {
            emoji: "🔒",
            title: "You can reset your password.",
            message: "Please enter your new password below.",
            buttonUrl: "",
        },
        400: {
            emoji: "🤔",
            title: "The token is invalid or has expired.",
            message: "Please request a new confirmation email by clicking the button below.",
            buttonUrl: "/forget-password",
        },
        403: {
            emoji: "🤔",
            title: "Your token has already been used.",
            message: "Your password has already been reset. You can login to your account.",
            buttonUrl: "/login",
        }
    };

    const currentStatus = statusMessages[req as keyof typeof statusMessages];

    return (
        <section className="block min-h-screen">
            {currentStatus && (
                <div className="p-4 sm:p-6 lg:p-8 text-center m-8 bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                    <h1 className="text-9xl mb-8">
                        {currentStatus.emoji}
                    </h1>
                    <p className="text-2xl font-bold tracking-tight text-gray-900 mt-4 sm:text-4xl">
                        {currentStatus.title}
                    </p>
                    <p className="mt-4 text-gray-500">
                        {currentStatus.message}
                    </p>
                    {
                        req === 200 ? (
                            <div className="flex flex-col justify-center items-center gap-2 w-full">
                                <FormikProvider value={formik}>
                                    <Form id="register" className="flex flex-col lg:px-4 gap-1 w-full max-w-full lg:max-w-[50vw] mx-auto my-6">
                                        <div className="flex justify-between w-full items-center">
                                            <label htmlFor="password" className="text-black text-sm font-semibold">
                                                Password <span className="text-red-600">*</span>
                                            </label>
                                            <ErrorMessage name="password" component="span" className="text-red-600 leading-3 text-sm" />
                                        </div>
                                        <Field type="password" placeholder="Password" name="plainPassword" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm" />

                                        <div className="flex justify-between w-full items-center mt-4">
                                            <label htmlFor="confirmPassword"
                                                className="text-black text-sm font-semibold">
                                                Confirm Password <span className="text-red-600">*</span>
                                            </label>
                                            <ErrorMessage name="confirmPassword" component="span" className="text-red-600 leading-3 text-sm" />
                                        </div>
                                        <Field type="password" placeholder="Confirm Password" name="confirmPassword"
                                            className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm" />

                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <Button intent="default" type="submit" className="mt-4 w-full">
                                                Save new password
                                            </Button>
                                        </div>
                                    </Form>
                                </FormikProvider>
                            </div>
                        ) : (
                            <a href={currentStatus.buttonUrl} className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
                                {currentStatus.buttonUrl ? "Request a new email" : "Reset your password"}
                            </a>
                        )
                    }
                </div>
            )}
        </section>
    )
}