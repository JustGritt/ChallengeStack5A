"use client";
import Skeleton from "react-loading-skeleton";
import {
  faLocationDot,
  faStar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Button } from "@/components/Ui/Button";
import StoreServiceCard from "@/components/Pages/Store/StoreServiceCard";
import { useGetStoreQuery } from "@/lib/services/stores";
import StoreServicesCard from "@/components/Pages/Store/StoreServiceCard";
import React from "react";
import CustomCalendar from "@/components/Calendar/CustomCalendar";
import { StripeLogo } from "@/components/Icons/Icons";
import { loadStripe } from "@stripe/stripe-js";

const data = {
  storeName: "StoreCard",
  address: "78 Address, address 75001, Paris",
  rating: "4.3",
  reviews: "50",
  price: "€€€",
  imgs: [
    "/logo.svg",
    "/logo.svg",
    "/logo.svg",
    "/logo.svg",
    "/logo.svg",
    "/logo.svg",
    "/logo.svg",
  ],
  services: [
    {
      name: "Prestation 1",
      duration: "3 heures",
      price: "300€",
    },
    {
      name: "Prestation 2",
      duration: "3 heures",
      price: "300€",
    },
    {
      name: "Prestation 3",
      duration: "3 heures",
      price: "300€",
    },
    {
      name: "Prestation 4",
      duration: "3 heures",
      price: "300€",
    },
  ],
  collaborators: [
    {
      name: "Anthoni",
      img: "/logo.svg",
    },
    {
      name: "Reed",
      img: "/logo.svg",
    },
  ],
};

const stripePromise = loadStripe('pk_test_51OMwURF9MmQfZRp3FWy76r8hxd5EsxW4GJGN2oXBz8L2Sp97UohCfqcGokB1kGfdX8E5YMMkwd85Dy931aEOhNdU00046RjC2C');

const StorePage: FC<ServerSideComponentProp<{ id: string }>> = ({
  params: { id },
}) => {
  const { isLoading, isError, data: store } = useGetStoreQuery(id);
  const refSectionServices = React.useRef<null | HTMLDivElement>(null);

  const handleClick = async () => {
    console.log('click')
    const { sessionId } = await fetch("/api/checkout/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 100 })
    }).then((res) => res.json());
    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      sessionId,
    });
  }

  return (
    <main className="w-full z-40 flex flex-col bg-white py-4 px-3 items-center">
      <section className="max-w-6xl w-full px-6 md:px-10 lg:px-0 flex items-start lg:items-center justify-start gap-3 my-4">
        <div className=" w-full flex flex-col justify-start items-start">
          <h1 className="font-inter font-semibold text-2xl text-black">
            {store?.name ?? <Skeleton width={200} />}
          </h1>
          <div className="flex gap-2 justify-center items-center">
            <FontAwesomeIcon className="text-gray-500" icon={faLocationDot} />
            <Link
              className="text-gray-500 underline hover:no-underline"
              href={`${data.address}`}
            >
              {store?.address ?? <Skeleton width={200} />}
            </Link>
          </div>
        </div>
        <Button
          onClick={() => {
            const section = refSectionServices.current;
            section?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          {" "}
          Prendre&nbsp;RDV
        </Button>
      </section>
      <section className="max-w-6xl w-full flex px-6 md:px-10 lg:px-0 "></section>
      <section className=" max-w-6xl w-full px-6 md:px-10 lg:px-0">
        <h2>
          Réserver en ligne pour un RDV chez{" "}
          {store?.name ?? <Skeleton width={150} />}
        </h2>
        <span className="text-gray-500">24h/24 - details de reservation</span>
        <div className="flex w-full justify-between gap-8 flex-col xl:flex-row">
          <div className=" lg:w-[60%] w-full ">
            <h1 className="text-black font-bold text-2xl my-2">
              Choix de prestation
            </h1>
            <div className="w-full my-4" ref={refSectionServices}>
              <h2 className="text-black font-bold text-xl my-2">Services</h2>
              {store?.services ? (
                <StoreServicesCard services={store?.services} />
              ) : (
                <Skeleton count={6} className="w-full" />
              )}
              <div className="mt-6">
                <CustomCalendar />
              </div>
              {/* <StoreServiceCard /> */}
            </div>
            <div className="w-full my-4">
              <div className="my-4">
                <h2 className="text-black font-bold text-xl my-2">
                  Où est-ce qu&apos;on se situe?
                </h2>
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    className="text-gray-500"
                    icon={faLocationDot}
                  />
                  <Link
                    className="text-gray-500 underline hover:no-underline"
                    href={`http://maps.google.com/?q=${store?.address}`}
                  >
                    {store?.address ?? <Skeleton width={200} />}
                  </Link>
                </div>
              </div>
              {/* <CustomMap /> */}
            </div>
            <div className="w-full my-4">
              <h2 className="text-black font-bold text-xl my-2">À propos</h2>
              <div className="rounded-lg border border-1 border-gray-300 py-8 px-6 shadow-lg">
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[400px]">
            <h1 className="text-black font-bold text-2xl my-2">
              Collaborateurs
            </h1>

            <div className="rounded-lg p-6 shadow-lg flex flex-wrap gap-4">
              <div className="w-fit rounded-lg flex flex-col items-center border border-1 border-gray-200 p-6">
                <span className="bg-black px-10 py-8 rounded-full">A</span>
                <span className="text-black">Anthoni</span>
              </div>
              <div className="w-fit rounded-lg flex flex-col items-center border border-1 border-gray-200 p-6">
                <span className="bg-black px-10 py-8 rounded-full">R</span>
                <span className="text-black">Reed</span>
              </div>
            </div>
          </div>
          <div>
            <Button className="flex w-full max-w-[350px] justify-center items-center" onClick={handleClick}>
              Pay your order
              <span>|</span>
              <StripeLogo className={`w-12`} />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StorePage;
