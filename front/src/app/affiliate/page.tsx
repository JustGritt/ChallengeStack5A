"use client";
import {
    Form,
    Field,
    FormikProvider,
    useFormik,
    ErrorMessage,
    FormikConfig,
} from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { Button } from "@/components/Ui/Button";
import { CompanyRequestType, UserRegister } from "@/types/User";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useBecomeAffiliateMutation, useGetMyProfileQuery, useLazyGetMyProfileQuery } from "@/lib/services/auth";
import { ApiErrorResponse } from "@/types/ApiBase";
import Footer from "@/components/Footer";
import NavBar from "@/components/Header/NavBar";
import { resetCredentials } from "@/lib/services/slices/authSlice";
import { useDispatch } from "react-redux";
import AuthMiddleware from "@/middlewares/AuthMiddleware";

export default function Affiliate() {
    const initialValues: CompanyRequestType = {
        name: "",
        kbis: "",
        rcs: "",
        capital: 0,
        adresse: "",
        structure: "",
        registrationDate: new Date(),
        firstname: "",
        lastname: "",
        birthday: new Date(),
        birthdayPlace: "",
        ownerAdresse: "",
        endDuration: new Date()
    };
    const router = useRouter();
    const [affiliate, { isLoading: isBecomeAffiliateLoading }] = useBecomeAffiliateMutation();

    const validationSchema = Yup.object().shape({
        kbis: Yup.string().required("Required"),
        name: Yup.string().required("Required"),
        rcs: Yup.string().required("Required"),
        capital: Yup.number().required("Required"),
        adresse: Yup.string().required("Required"),
        structure: Yup.string().required("Required").oneOf(["SA", "SARL", "SAS", "SASU", "EURL", "GIE", "SCI"]),
        firstname: Yup.string().required("Required"),
        lastname: Yup.string().required("Required"),
        birthday: Yup.date().required("Required"),
        birthdayPlace: Yup.string().required("Required"),
        ownerAdresse: Yup.string().required("Required"),
        endDuration: Yup.date().required("Required"),
    })

    const onSubmit: FormikConfig<CompanyRequestType>["onSubmit"] = (values) => {
        affiliate(values)
            .unwrap()
            .then(async (res) => {
                router.push("/affiliate-created");
            })
            .catch((affiliateError) => {
                toast.error((affiliateError as ApiErrorResponse).data["detail"])
            });
    };

    const formik = useFormik<CompanyRequestType>({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    return (
        <AuthMiddleware>
            <>
                <NavBar />
                <div className="m-auto w-full flex justify-center items-center relative p-8 bg-[#EEF2FF] min-h-[70vh] flex-col-reverse lg:flex-row ">
                    <div className="flex w-full max-w-[50%]">
                        <div className="bg-white rounded p-10 flex-col flex justify-center items-center w-full">
                            <div className="flex flex-col gap-2 justify-center w-full items-center">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M32 0H29.224V2.0167H26.476V0H5.52398V2.0167H2.77566V0H0V32H2.77566V29.9833H5.52398V32H26.476V29.9833H29.224V32H32V0ZM5.52398 27.4696H2.77566V23.62H5.52398V27.4696ZM5.52398 21.1063H2.77566V17.2566H5.52398V21.1063ZM5.52398 14.743H2.77566V10.8933H5.52398V14.743ZM5.52398 8.38041H2.77566V4.52999H5.52398V8.38041ZM23.8651 29.9028H8.13487V17.052H23.8655L23.8651 29.9028ZM23.8651 14.9476H8.13487V2.09757H23.8655L23.8651 14.9476ZM29.224 27.4696H26.476V23.62H29.224V27.4696ZM29.224 21.1063H26.476V17.2566H29.224V21.1063ZM29.224 14.743H26.476V10.8933H29.224V14.743ZM29.224 8.38041H26.476V4.52999H29.224V8.38041Z"
                                        fill="#111111"
                                    />
                                </svg>
                                <h1 className="text-center text-black text-xxl font-bold">
                                    Become an Odicylens affiliate ?
                                </h1>
                            </div>
                            <FormikProvider value={formik}>
                                <Form id="register" className="flex flex-col px-4 gap-4 w-full">
                                    <div className="flex w-full gap-8 justify-evenly">
                                        <div className="w-full flex flex-col justify-between">
                                            <div className="w-full">
                                                <div className="flex justify-between w-full items-center">
                                                    <label
                                                        htmlFor="kbis"
                                                        className="text-black text-sm font-semibold"
                                                    >
                                                        K-bis <span className="text-red-600">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="kbis"
                                                        component="span"
                                                        className="text-red-600 leading-3 text-sm"
                                                    />
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="K-bis number"
                                                    name="kbis"
                                                    className="border border-gray-200 w-full text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm "
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-between w-full items-center">
                                                    <label
                                                        htmlFor="name"
                                                        className="text-black text-sm font-semibold"
                                                    >
                                                        Company name <span className="text-red-600">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="name"
                                                        component="span"
                                                        className="text-red-600 leading-3 text-sm"
                                                    />
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="Company name"
                                                    name="name"
                                                    className="border border-gray-200 w-full text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-between w-full items-center">
                                                    <label
                                                        htmlFor="rcs"
                                                        className="text-black text-sm font-semibold"
                                                    >
                                                        RCS <span className="text-red-600">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="rcs"
                                                        component="span"
                                                        className="text-red-600 leading-3 text-sm"
                                                    />
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="RCS number"
                                                    name="rcs"
                                                    className="border border-gray-200 w-full text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-between w-full items-center">
                                                    <label
                                                        htmlFor="capital"
                                                        className="text-black text-sm font-semibold"
                                                    >
                                                        Capital <span className="text-red-600">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="capital"
                                                        component="span"
                                                        className="text-red-600 leading-3 text-sm"
                                                    />
                                                </div>
                                                <Field
                                                    type="number"
                                                    placeholder="Capital"
                                                    name="capital"
                                                    className="border border-gray-200 w-full text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-between w-full items-center">
                                                    <label
                                                        htmlFor="adresse"
                                                        className="text-black text-sm font-semibold"
                                                    >
                                                        Adresse <span className="text-red-600">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="adresse"
                                                        component="span"
                                                        className="text-red-600 leading-3 text-sm"
                                                    />
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="Adresse"
                                                    name="adresse"
                                                    className="border border-gray-200 w-full text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-between w-full items-center">
                                                    <label
                                                        htmlFor="structure"
                                                        className="text-black text-sm font-semibold"
                                                    >
                                                        Structure <span className="text-red-600">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="structure"
                                                        component="span"
                                                        className="text-red-600 leading-3 text-sm"
                                                    />
                                                </div>
                                                <Field
                                                    as="select"
                                                    name="structure"
                                                    className="border border-gray-200 w-full text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm"
                                                >
                                                    <option value="" disabled>Select a structure</option>
                                                    <option value="SA">SA</option>
                                                    <option value="SARL">SARL</option>
                                                    <option value="SAS">SAS</option>
                                                    <option value="SASU">SASU</option>
                                                    <option value="EURL">EURL</option>
                                                    <option value="GIE">GIE</option>
                                                    <option value="SCI">SCI</option>
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="w-full">
                                                <div className="flex justify-between w-full items-center ">
                                                    <label
                                                        htmlFor="firstname"
                                                        className="text-black text-sm font-semibold"
                                                    >
                                                        First Name <span className="text-red-600">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="firstname"
                                                        component="span"
                                                        className="text-red-600 leading-3 text-sm"
                                                    />
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="First Name"
                                                    name="firstname"
                                                    className="border border-gray-200 w-full text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-between w-full items-center">
                                                    <label
                                                        htmlFor="lastname"
                                                        className="text-black text-sm font-semibold"
                                                    >
                                                        Last Name <span className="text-red-600">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="lastname"
                                                        component="span"
                                                        className="text-red-600 leading-3 text-sm"
                                                    />
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="Last Name"
                                                    name="lastname"
                                                    className="border border-gray-200 w-full text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-between w-full items-center">
                                                    <label
                                                        htmlFor="birthday"
                                                        className="text-black text-sm font-semibold"
                                                    >
                                                        Birthday <span className="text-red-600">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="birthday"
                                                        component="span"
                                                        className="text-red-600 leading-3 text-sm"
                                                    />
                                                </div>
                                                <Field
                                                    type="date"
                                                    placeholder="Birthday"
                                                    name="birthday"
                                                    className="border border-gray-200 w-full text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-between w-full items-center">
                                                    <label
                                                        htmlFor="birthdayPlace"
                                                        className="text-black text-sm font-semibold"
                                                    >
                                                        Birthday place <span className="text-red-600">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="birthdayPlace"
                                                        component="span"
                                                        className="text-red-600 leading-3 text-sm"
                                                    />
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="Birthday place"
                                                    name="birthdayPlace"
                                                    className="border border-gray-200 w-full text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-between w-full items-center">
                                                    <label
                                                        htmlFor="ownerAdresse"
                                                        className="text-black text-sm font-semibold"
                                                    >
                                                        Owner adresse <span className="text-red-600">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="ownerAdresse"
                                                        component="span"
                                                        className="text-red-600 leading-3 text-sm"
                                                    />
                                                </div>
                                                <Field
                                                    type="text"
                                                    placeholder="Owner adresse"
                                                    name="ownerAdresse"
                                                    className="border border-gray-200 w-full text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-between w-full items-center">
                                                    <label
                                                        htmlFor="endDuration"
                                                        className="text-black text-sm font-semibold"
                                                    >
                                                        End duration <span className="text-red-600">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="endDuration"
                                                        component="span"
                                                        className="text-red-600 leading-3 text-sm"
                                                    />
                                                </div>
                                                <Field
                                                    type="date"
                                                    placeholder="End duration"
                                                    name="endDuration"
                                                    className="border border-gray-200 w-full text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <Button intent="default" type="submit" className="mt-4 w-full">
                                            Send request
                                        </Button>
                                    </div>
                                </Form>
                            </FormikProvider>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        </AuthMiddleware>
    );
}