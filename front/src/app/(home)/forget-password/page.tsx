"use client";
import { Form, Field, FormikProvider, useFormik, ErrorMessage, FormikConfig } from "formik";
import * as Yup from "yup";
import Button from "@/components/Ui/Button";
import { User, UserForgetPassword } from "@/types/User";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForgetPasswordMutation } from "@/lib/services/auth";
import { ApiErrorResponse } from "@/types/ApiBase";

export default function ForgetPassword() {
    const initialValues: UserForgetPassword = {
        email: "",
    };

    const router = useRouter();
    const [ forgetPassword, { data, error, isLoading } ] = useForgetPasswordMutation();

    const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
});

    const onSubmit: FormikConfig<UserForgetPassword>["onSubmit"] = (values) => {
        forgetPassword(values).then(() => {
            router.push("/login");
            toast.custom((t) => (
                <div className={`${"animate-enter"} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Password reset link sent
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    We have sent a password reset link to your email address. Please check your email.
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
            formik.setErrors({
                email: registerError.data.errors[0].message,
            });
        });
    };

    const formik = useFormik<UserForgetPassword>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    return (
        <section className="block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 text-center m-8 bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        You forgot your password?
                    </h2>
                    <p className="mt-4 text-gray-500">
                        Enter your email address and we will send you a link to reset your password.
                    </p>
                </div>

                <FormikProvider value={formik}>
                    <Form id="register" className="flex flex-col lg:px-4 gap-1 max-w-full lg:max-w-[50vw] mx-auto my-6">
                        <div className="flex justify-between w-full items-center">
                            <label htmlFor="email" className="text-black text-sm font-semibold">
                                Email <span className="text-red-600">*</span>
                            </label>
                            <ErrorMessage name="email" component="span" className="text-red-600 leading-3 text-sm" />
                        </div>
                        <Field type="email" placeholder="user@odicylens.com" name="email" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm" />

                        <div className="flex flex-col justify-center items-center gap-2">
                            <Button
                                title={"Send reset link"}
                                type="submit"
                                isLoading={isLoading}
                                classNames="mt-4 w-full"
                            />
                            <p className="mt-10 text-center text-sm text-gray-500">
                                Not a member yet?{' '}
                                <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Create an account
                                </a>
                            </p>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </section>
    );
}
