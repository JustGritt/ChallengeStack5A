"use client";

import * as Yup from "yup";
import toast from "react-hot-toast";
import { Button } from "@/components/Ui/Button";
import { useRouter } from "next/navigation";
import { ApiErrorResponse } from "@/types/ApiBase";
import { useUpdateUserProfileMutation, useUpdateUserPasswordMutation } from "@/lib/services/auth";
import { UserUpdateProfile, UserUpdatePassword } from "@/types/User";
import { Form, Field, FormikProvider, useFormik, ErrorMessage, FormikConfig } from "formik";

export default function EditProfile() {

    // Update profile
    const [profileFields] = useUpdateUserProfileMutation();
    const initialProfileValues: UserUpdateProfile = { firstname: "" };
    const validationProfileSchema = Yup.object().shape({ firstname: Yup.string().required("Required") });

    // Update password
    const [passwordFields] = useUpdateUserPasswordMutation();
    const initialPasswordValues: UserUpdatePassword = { plainPassword: "", confirmPassword: "" };
    const validationPasswordSchema = Yup.object().shape({
        plainPassword: Yup.string().required("Required").min(6, "Password must be at least 6 characters"),
        confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("plainPassword"), ""], "Passwords must match"),
    });

    const onSubmitProfile: FormikConfig<UserUpdateProfile>["onSubmit"] = (values) => {
        profileFields(values).unwrap()
        .then(() => {
            toast.custom((t) => (
                <div className="bg-white dark:bg-slate-800 text-black dark:text-white rounded-lg p-4 shadow-lg">
                    Profile updated
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

    const onSubmitPassword: FormikConfig<UserUpdatePassword>["onSubmit"] = (values) => {
        passwordFields(values).unwrap()
        .then(() => {
            toast.custom((t) => (
                <div className="bg-white dark:bg-slate-800 text-black dark:text-white rounded-lg p-4 shadow-lg">
                    Password updated
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
    }

    const formikProfile = useFormik<UserUpdateProfile>({
        initialValues: initialProfileValues,
        validationSchema: validationProfileSchema,
        onSubmit: onSubmitProfile,
    });

    const formikPassword = useFormik<UserUpdatePassword>({
        initialValues: initialPasswordValues,
        validationSchema: validationPasswordSchema,
        onSubmit: onSubmitPassword,
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

                            <div className="flex flex-col justify-center items-center gap-2">
                                <Button intent="default" type="submit" className="mt-4 w-full">
                                    Save changes
                                </Button>
                            </div>
                        </Form>
                    </FormikProvider>
                </div>

                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border mt-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                        Change password
                    </h2>
                    <FormikProvider value={formikPassword}>
                        <Form id="passwordFields" className="flex flex-col px-4 gap-1">
                            <div className="sm:grid sm:grid-cols-2 gap-4 w-full">
                                <div>
                                    <label htmlFor="password" className="text-black text-sm font-semibold">
                                        Password <span className="text-red-600">*</span>
                                    </label>
                                    <ErrorMessage name="password" component="span" className="text-red-600 leading-3 text-sm" />
                                    <Field type="text" placeholder="Must have more than 6 characters" name="password" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full" />
                                </div>

                                <div className="mt-4 sm:mt-0">
                                    <label htmlFor="passwordConfirm" className="text-black text-sm font-semibold">
                                        Confirm Password <span className="text-red-600">*</span>
                                    </label>
                                    <ErrorMessage name="passwordConfirm" component="span" className="text-red-600 leading-3 text-sm" />
                                    <Field type="text" name="passwordConfirm" placeholder="Must match the password" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full" />
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
