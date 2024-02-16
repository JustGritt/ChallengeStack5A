"use client";

import * as Yup from "yup";
import toast from "react-hot-toast";
import Breadcrumb from "@/components/Header/Breadcrumb";
import type { CreateStore } from "@/types/Store";
import { Button } from "@/components/Ui/Button";
import { Button as ButtonShadcn } from "@/components/Ui/ButtonShadcn";
import { useRouter } from "next/navigation";
import { useAddStoreMutation } from "@/lib/services/stores";
import {
  Form,
  Field,
  FormikProvider,
  useFormik,
  ErrorMessage,
  FormikConfig,
} from "formik";
import { AddressAutofill } from "@mapbox/search-js-react";
import { AddressAutofillProps } from "@mapbox/search-js-react/dist/components/AddressAutofill";
import Link from "next/link";

export default function NewStore() {
  const initialValues: CreateStore = {
    name: "",
    address: "",
    postalCode: "",
    description: "",
    country: "",
    city: "",
    coordinates: undefined,
  };

  const router = useRouter();
  const [addStore, { isLoading }] = useAddStoreMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Required"),
    address: Yup.string().required("Required"),
    postalCode: Yup.string()
      .required("Required")
      .matches(/^[0-9]{5}$/, "Invalid postal code"),
    description: Yup.string()
      .min(10, "Must be 10 characters or more")
      .required("Required"),
    country: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    fullAdress: Yup.object(),
    coordinates: Yup.object(),
  });

  const onSubmit: FormikConfig<CreateStore>["onSubmit"] = (values) => {
    addStore({
      ...values,
      longitude: values.coordinates?.longitude,
      latitude: values.coordinates?.latitude,
    })
      .unwrap()
      .then((res) => {
        router.push("stores");
        toast.success("Store created successfully");
      });
  };

  const formik = useFormik<CreateStore>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

  const AddressAutofilComp = AddressAutofill as React.FC<AddressAutofillProps>;

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
                <label
                  htmlFor="name"
                  className="text-black text-sm font-semibold"
                >
                  Store name<span className="text-red-600">*</span>
                </label>
                <ErrorMessage
                  name="name"
                  component="span"
                  className="text-red-600 leading-3 text-sm"
                />
              </div>
              <Field
                type="text"
                name="name"
                className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm "
              />

              <div className="grid grid-cols-2 gap-2 mt-2">
                {/* <div>
                  <label
                    htmlFor="storeAddress"
                    className="text-black text-sm font-semibold mr-2"
                  >
                    Address <span className="text-red-600">*</span>
                  </label>
                  <ErrorMessage
                    name="storeAddress"
                    component="span"
                    className="text-red-600 leading-3 text-sm"
                  />
                  <Field
                    type="text"
                    name="storeAddress"
                    className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full"
                  />
                </div> */}
                <AddressAutofilComp
                  accessToken={accessToken ?? ""}
                  onRetrieve={(val) => {
                    formik.setFieldValue(
                      "address",
                      val.features[0].properties.full_address
                    );
                    formik.setFieldValue(
                      "postalCode",
                      val.features[0].properties.postcode
                    );
                    formik.setFieldValue(
                      "city",
                      val.features[0].properties.address_level2
                    );
                    formik.setFieldValue(
                      "country",
                      val.features[0].properties.country
                    );
                    formik.setFieldValue("coordinates", {
                      longitude: val.features[0].geometry.coordinates[0],
                      latitude: val.features[0].geometry.coordinates[1],
                    });
                  }}
                  onChange={formik.handleChange}
                >
                  <>
                    <label
                      htmlFor="address"
                      className="text-black text-sm font-semibold mr-2"
                    >
                      Address <span className="text-red-600">*</span>
                    </label>
                    <ErrorMessage
                      name="address"
                      component="span"
                      className="text-red-600 leading-3 text-sm"
                    />

                    <input
                      type="address"
                      autoComplete="address-line1"
                      placeholder="Merci d'entrer une adresse, e.g. 123 Main..."
                      name="plaincountry"
                      className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full"
                      id="mapbox-autofill"
                    />
                    {formik.values.address && (
                      <ButtonShadcn
                        variant="link"
                        className="p-0 text-gray-400"
                      >
                        <Link
                          href={`https://www.google.com/maps/search/${formik.values.address}`}
                        >
                          {formik.values.address}
                        </Link>
                      </ButtonShadcn>
                    )}
                  </>
                </AddressAutofilComp>
                <div>
                  <label
                    htmlFor="postalCode"
                    className="text-black text-sm font-semibold mr-2"
                  >
                    Postal code <span className="text-red-600">*</span>
                  </label>
                  <ErrorMessage
                    name="postalCode"
                    component="span"
                    className="text-red-600 leading-3 text-sm"
                  />
                  <Field
                    type="postalCode"
                    name="postalCode"
                    disabled
                    className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <label
                    htmlFor="country"
                    className="text-black text-sm font-semibold mr-2"
                  >
                    Country <span className="text-red-600">*</span>
                  </label>
                  <ErrorMessage
                    name="country"
                    component="span"
                    className="text-red-600 leading-3 text-sm"
                  />
                  <Field
                    type="country"
                    disabled
                    name="country"
                    className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="text-black text-sm font-semibold mr-2"
                  >
                    City <span className="text-red-600">*</span>
                  </label>
                  <ErrorMessage
                    name="city"
                    component="span"
                    className="text-red-600 leading-3 text-sm"
                  />
                  <Field
                    type="city"
                    disabled
                    name="city"
                    className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between w-full items-center mt-4">
                <label
                  htmlFor="name"
                  className="text-black text-sm font-semibold"
                >
                  Description du store<span className="text-red-600">*</span>
                </label>
                <ErrorMessage
                  name="description"
                  component="span"
                  className="text-red-600 leading-3 text-sm"
                />
              </div>
              <Field
                as="textarea"
                type="text"
                placeholder="Merci d'entrer une description..."
                name="description"
                className="border border-gray-200 text-black rounded px-3 py-2 mt-2 focus:outline-0 font-inter placeholder:text-gray-400 placeholder:text-sm "
              />
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
