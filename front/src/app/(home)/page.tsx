/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Faq from "@/components/partials/Faq";
import FormSearchHome from "@/components/Forms/FormSearchHome";
import { Button } from "@/components/Ui/Button";
import { useRouter } from "next/navigation";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";
import Link from "next/link";

export default function Home() {

  return (
    <>
      <main className="min-h-screen ">
        <section className="h-11/12 w-full relative min-h-[500px] max-h-[600px]">
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
            <FormSearchHome />
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
            <Button
              intent="default"
              className="mt-8 h-16 px-8 grid place-items-center transition-colors rounded-full text-lg"
            >
              <Link href="/affiliate">Become a Odicylens affiliate</Link>
            </Button>
          </div>

          <div className="flex-1 p-4 flex-wrap flex-row flex gap-x-4 gap-y-4 justify-center items-center">
            {datasProfessionnal.map((d, i) => (
              <div
                key={i}
                className="flex items-center p-4 w-fit bg-white rounded-lg shadow-lg	h-fit"
              >
                <ArrowDownTrayIcon className="w-8 h-8 text-black" />
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
  },
  {
    title: "Active users",
    value: "1M+",
  },
  {
    title: "Daily transactions",
    value: "10M+",
  },
  {
    title: "Revenue",
    value: "1M+",
  },
  {
    title: "Subscriptions",
    value: "100M+",
  },
  {
    title: "New users",
    value: "10M+",
  },
  {
    title: "Affiliates",
    value: "100M+",
  },
  {
    title: "Collaborators",
    value: "10M+",
  },
  {
    title: "Partners",
    value: "100M+",
  },
];
