"use client";

import useLoadOptions from "@/lib/hooks/useLoadOptions";
import { ISelectOption } from "@/types/Select";
import { Service } from "@/types/Service";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import * as Yup from "yup";
import { AsyncSelectComponent } from "../Ui/SelectField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@/types/Store";
import { Button } from "../Ui/Button";

type FormValues = {
  domainSearch: ISelectOption<Service> | undefined;
  location: ISelectOption<Store> | undefined;
};

const FormSearchHome = () => {
  const { loadServicesOptions, loadCityStoresOptions } = useLoadOptions();
  const initialValues: FormValues = {
    domainSearch: undefined,
    location: undefined,
  };
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    domainSearch: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
  });

  const formik = useFormik<FormValues>({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (values.domainSearch) {
        router.push(`/search?${new URLSearchParams(values as any).toString()}`);
        return;
      }
    },
  });
  return (
    <FormikProvider value={formik}>
      <Form id="search">
        <div className="rounded-xl xl:items-end items-center bg-white px-4 py-2 mt-5 flex  max-w-[900px] justify-around lg:px-0 lg:flex-row flex-col">
          <div className="flex-col flex lg:w-fit w-full">
            <label
              htmlFor="search-service"
              className="text-black text-md mt-1"
            >
              What are you looking for?
            </label>
            <AsyncSelectComponent
              loadOptions={loadServicesOptions}
              value={formik.values.domainSearch?.value}
              isClearable
              name="domainSearch"
              onChange={(value) =>
                formik.setFieldValue("domainSearch", value?.name)
              }
              closeMenuOnSelect
              placeholder="Photographer, Designer, Videographer..."
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => String(option.id)}
              styles={{
                placeholder: (base) => ({
                  ...base,
                  color: "gray",
                }),
              }}
              className="lg:p-0 w-full lg:w-96 text-xl"
            />

            <ErrorMessage
              name="domainSearch"
              component="span"
              className="text-red-600"
            />
          </div>

          <div className="flex-col flex lg:w-fit w-full">
            <label
              htmlFor="search-service"
              className="text-black text-md mt-1"
            >
              Location
            </label>
            <AsyncSelectComponent
              loadOptions={loadCityStoresOptions}
              value={formik.values.location?.value}
              isClearable
              name="location"
              onChange={(value) =>
                formik.setFieldValue("location", value?.city)
              }
              closeMenuOnSelect
              placeholder="Paris"
              getOptionLabel={(option) => option.city}
              getOptionValue={(option) => String(option.id)}
              styles={{
                placeholder: (base) => ({
                  ...base,
                  color: "gray",
                }),
              }}
              className="lg:p-0 w-full lg:w-96"
            />
            <ErrorMessage
              name="location"
              component="span"
              className="text-red-600"
            />
          </div>

          <div className="mt-4 lg:mt-0">
            <Button type="submit">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-white h-4 w-4 font-bold"
              />
            </Button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default FormSearchHome;
