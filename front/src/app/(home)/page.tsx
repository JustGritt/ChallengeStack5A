/* eslint-disable @next/next/no-img-element */
"use client";
import * as Yup from "yup";
import React from "react";
import Faq from "../../components/partials/Faq";
import { Button } from "@/components/Ui/Button";
import { useRouter } from "next/navigation";
import { SelectField } from "@/components/Ui/SelectField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSearch } from "@fortawesome/free-solid-svg-icons";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";

export default function Home() {
  const router = useRouter();

  const initialValues = {
    domainSearch: "",
    location: "",
  };

  const validationSchema = Yup.object().shape({
    domainSearch: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values) => {
      router.push(`/search?${new URLSearchParams(values).toString()}`);
    },
  });

  return (
    <>
      <main className="min-h-screen ">
        <section className="h-11/12 w-full relative min-h-[500px] max-h-[600px] overflow-hidden	">
          <img
            src="https://images.unsplash.com/photo-1560785218-893cc779709b?q=80&w=2792&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={"Bg"}
            className="h-[600px] w-full object-cover"
          />
          <div className="absolute bottom-0 p-6 lg:p-12 w-full">
            <h1 className="text-xl font-inter font-thin text-white ">
              Explore Our Collaborators
            </h1>
            <h2 className="text-3xl text-white font-bold">
              The Gateway to Exceptional Professional Services
            </h2>
            <FormikProvider value={formik}>
              <Form id="search">
                <div className="rounded-xl items-left lg:items-center bg-white px-4 py-2 mt-5 flex  max-w-[900px] justify-around lg:px-0 lg:flex-row flex-col">
                  <div className="flex-col flex">
                    <label
                      htmlFor="search-service"
                      className="text-gray-500 text-sm mt-1"
                    >
                      What are you looking for?
                    </label>
                    <SelectField
                      label="Users"

                      options={[
                        { label: "user1", value: 1 },
                        { label: "user1", value: 1 },
                      ]}
                      isSearchable={true}
                    />
                    <Field
                      id="search-service"
                      name="domainSearch"
                      type="text"
                      placeholder="Cameraman, Photoshoot ..."
                      className="border-0 focus:ring-0 text-black placeholder-black border-b-2 border-b-transparent focus:border-b-slate-600 mt-1 p-2 pl-0 lg:p-0 w-full lg:w-96 transition-colors"
                    />
                    <ErrorMessage
                      name="domainSearch"
                      component="span"
                      className="text-red-600"
                    />
                  </div>

                  <div className="flex-col flex mt-2 lg:mt-0">
                    <label
                      htmlFor="search-service"
                      className="text-gray-500 text-sm mt-1"
                    >
                      Location
                    </label>
                    <Field
                      id="location"
                      type="text"
                      name="location"
                      placeholder="Paris, France 75006"
                      className="border-0 focus:ring-0 text-black placeholder-black border-b-2 border-b-transparent focus:border-b-slate-600 mt-1 p-2 pl-0 lg:p-0 w-full lg:w-96 transition-colors"
                    />
                    <ErrorMessage
                      name="location"
                      component="span"
                      className="text-red-600"
                    />
                  </div>

                  <div>
                    <Button intent="default" type="submit" className="w-full my-2 py-2 lg:w-auto h-12 lg:my-0 lg:py-0 lg:px-4 grid place-items-center transition-colors">
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="text-white h-4 w-4 font-bold"
                      />
                    </Button>
                  </div>
                </div>
              </Form>
            </FormikProvider>
          </div>
        </section>

        <section className="block flex-row min-h-[500px] lg:flex py-8 bg-white">
          <div className="flex-1 justify-center items-center flex flex-col p-8">
            <h3 className="text-3xl text-bold font-inter">
              Are you a professional studio ?
            </h3>
            <p className="text-gray-500">
              Discover the ease of online appointment with Odicylens.
            </p>
            <Button intent="default" className="mt-8 h-16 px-8 grid place-items-center transition-colors rounded-full text-lg">
              Become a Odicylens affiliate
            </Button>
          </div>

          <div className="flex-1 p-4 flex-wrap flex-row flex gap-x-4 gap-y-4 justify-center items-center">
            {datasProfessionnal.map((d, i) => (
              <div
                key={i}
                className="flex items-center p-4 w-fit bg-white rounded-lg shadow-lg	h-fit"
              >
                <FontAwesomeIcon
                  size="xl"
                  icon={d.icon}
                  className="bg-main-light p-2 rounded-md text-main tex-3xl h-fit"
                />
                <div className="items-center flex flex-col pl-4">
                  <h3 className="h-4 text-black">{d.title}</h3>
                  <p className="text-gray-500 text-sm h-4 mt-1">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col lg:flex-row max-h-[500px] py-8 bg-main-dark overflow-hidden">
          <div className="flex-1 hidden lg:block">
            <img
              src="/assets/iphone-mockup.png"
              alt="mock"
              className="w-full -mt-40 -ml-[100px]"
            />
          </div>
          <div className="flex-1 justify-center items-center flex flex-col p-8">
            <h3 className="text-3xl text-bold font-inter text-white">
              JOIN OUR COMMUNITY
            </h3>
            <p className="text-gray-500 text-center">
              Odicylens is on the lookout for dynamic individuals all over
              France, ready to revolutionize the shooting production sector
              through digital innovation
            </p>
            <Button intent="default" className="mt-4">
              Discover Our Offer
            </Button>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row min-h-[600px] py-8  overflow-hidden justify-center items-center bg-[#FAFAFA]">
          <Faq classNames={{ container: "w-full lg:w-1/2 h-fit" }} />
        </section>
      </main>
    </>
  );
}

const datasProfessionnal = [
  {
    title: "App downloads",
    value: "100M+",
    icon: faDownload,
  },
  {
    title: "App downloads",
    value: "100M+",
    icon: faDownload,
  },
  {
    title: "App downloads",
    value: "100M+",
    icon: faDownload,
  },
  {
    title: "App downloads",
    value: "100M+",
    icon: faDownload,
  },
  {
    title: "App downloads",
    value: "100M+",
    icon: faDownload,
  },
  {
    title: "App downloads",
    value: "100M+",
    icon: faDownload,
  },
  {
    title: "App downloads",
    value: "100M+",
    icon: faDownload,
  },
  {
    title: "App downloads",
    value: "100M+",
    icon: faDownload,
  },
  {
    title: "App downloads",
    value: "100M+",
    icon: faDownload,
  },
];
