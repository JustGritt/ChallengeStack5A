"use client";

import * as Yup from "yup";
import toast from "react-hot-toast";
import { Button } from "@/components/Ui/Button";
import { useRouter } from "next/navigation";
import { UserUpdate } from "@/types/User";
import { ApiErrorResponse } from "@/types/ApiBase";
import { useUpdateUserMutation } from "@/lib/services/auth";
import { Form, Field, FormikProvider, useFormik, ErrorMessage, FormikConfig } from "formik";

export default function EditProfile() {
    const initialValues: UserUpdate = {
        firstname: "",
        email: ""
    };
    const router = useRouter();
    const [updatedFields, { isLoading }] = useUpdateUserMutation();

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
    });

    const onSubmit: FormikConfig<UserUpdate>["onSubmit"] = (values) => {
        updatedFields(values).unwrap()
        .then((res) => {
            router.push("login");
            toast.custom((t) => (
                <div
                    className={`${"animate-enter"} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            Inscription
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            To complete the registration process and activate your
                            account, please check your email inbox.
                            <br />
                            <br />
                            If you encounter any issues or have questions, feel free to
                            contact our support team at :
                            <a
                            className="text-main hover:text-main-dark transition-all"
                            href="mailto:support@example.com"
                            >
                            support@example.com
                            </a>
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => {
                        toast.dismiss(t.id);
                        }}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Close
                    </button>
                    </div>
                </div>
            ));
        })
        .catch((registerError) => {
            const error = registerError as ApiErrorResponse;
            if (error.status === 400) {
                toast.error("Invalid email or password");
            } else {
                toast.error("An error occurred");
            }
        });
    };

    const formik = useFormik<UserUpdate>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    <FormikProvider value={formik}>
                        <Form id="updatedFields" className="flex flex-col px-4 gap-1">
                            <div className="flex justify-between w-full items-center">
                                <label htmlFor="firstname" className="text-black text-sm font-semibold">
                                    First Name <span className="text-red-600">*</span>
                                </label>
                                <ErrorMessage name="firstname" component="span" className="text-red-600 leading-3 text-sm" />
                            </div>
                            <Field type="text" placeholder="First Name" name="firstname" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm " />
                            <div className="flex justify-between w-full items-center">
                                <label htmlFor="email" className="text-black text-sm font-semibold">
                                    Email <span className="text-red-600">*</span>
                                </label>
                                <ErrorMessage name="email" component="span" className="text-red-600 leading-3 text-sm" />
                            </div>
                            <Field type="email" placeholder="Email" name="email" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm" />

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
