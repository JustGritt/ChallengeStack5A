"use client";

import * as Yup from "yup";
import toast from "react-hot-toast";
import Breadcrumb from "@/components/Header/Breadcrumb";
import type { NewStore } from "@/types/Store";
import { Button } from "@/components/Ui/Button";
import { useRouter } from "next/navigation";
import { useAddStoreMutation } from "@/lib/services/stores";
import { Form, Field, FormikProvider, useFormik, ErrorMessage, FormikConfig } from "formik";

export default function NewStore() {
    const initialValues: NewStore = {
        name: "",
        address: "",
        postalCode: "",
        country: "",
        city: "",
        latitude: 0,
        longitude: 0,
    };

    const router = useRouter();
    const [addCompany] = useAddStoreMutation();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        storeAddress: Yup.string().required("Required"),
        postalCode: Yup.string().required("Required").matches(/^[0-9]{5}$/, "Invalid postal code"),
        country: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        latitude: Yup.number().required("Required"),
        longitude: Yup.number().required("Required"),
    });

    const onSubmit: FormikConfig<NewStore>["onSubmit"] = (values) => {
        addCompany(values)
            .unwrap()
            .then((res) => {
                router.push("stores");
                toast.success("Store created successfully");
            });
    };

    const formik = useFormik<NewStore>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <Breadcrumb />
                <div className="mt-4 mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    <div className="flex flex-col gap-2 justify-center w-full items-center">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 inline">
                            Add a new store
                        </h2>
                    </div>
                    <FormikProvider value={formik}>
                        <Form id="addCompany" className="flex flex-col px-4 gap-1">
                            <div className="flex justify-between w-full items-center">
                                <label htmlFor="name" className="text-black text-sm font-semibold">
                                    Store name<span className="text-red-600">*</span>
                                </label>
                                <ErrorMessage name="name" component="span" className="text-red-600 leading-3 text-sm" />
                            </div>
                            <Field type="text" name="name" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm " />

                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div>
                                    <label htmlFor="storeAddress" className="text-black text-sm font-semibold mr-2">
                                        Address <span className="text-red-600">*</span>
                                    </label>
                                    <ErrorMessage name="storeAddress" component="span" className="text-red-600 leading-3 text-sm" />
                                    <Field type="text" name="storeAddress" className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full" />
                                </div>

                                <div>
                                    <label htmlFor="postalCode" className="text-black text-sm font-semibold mr-2">
                                        Postal code <span className="text-red-600">*</span>
                                    </label>
                                    <ErrorMessage name="postalCode" component="span" className="text-red-600 leading-3 text-sm" />
                                    <Field type="postalCode" name="postalCode"
                                    className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div>
                                    <label htmlFor="country" className="text-black text-sm font-semibold mr-2">
                                        Country <span className="text-red-600">*</span>
                                    </label>
                                    <ErrorMessage name="country" component="span" className="text-red-600 leading-3 text-sm" />
                                    <Field type="country" name="plaincountry"
                                    className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full" />
                                </div>

                                <div>
                                    <label htmlFor="city" className="text-black text-sm font-semibold mr-2">
                                        City <span className="text-red-600">*</span>
                                    </label>
                                    <ErrorMessage name="city" component="span" className="text-red-600 leading-3 text-sm" />
                                    <Field type="city" name="city"
                                    className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <Button intent="default" type="submit" className="mt-4 w-full">
                                    Create store
                                </Button>
                            </div>
                        </Form>
                    </FormikProvider>
                </div>
            </div>
        </section>
    );
}
