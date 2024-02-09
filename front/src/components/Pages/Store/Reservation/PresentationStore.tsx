"use client";
import { useLazyGetStoreServiceQuery } from "@/lib/services/services";
import {
  useLazyGetAllStoresQuery,
  useLazyGetStoreQuery,
} from "@/lib/services/stores";
import { Store } from "@/types/Store";
import { notFound } from "next/navigation";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

type PresentationStoreProps = {
  storeId: string;
  callBack?: (store: Store) => void;
};

const PresentationStore: FC<PresentationStoreProps> = ({
  storeId,
  callBack,
}) => {
  const [getStore, { isLoading, isError, data: store }] =
    useLazyGetStoreQuery();

  useEffect(() => {
    getStore(storeId).then((resp) => {
      if (resp.data) {
        if (callBack) {
          callBack(resp.data);
        }
      }
    });
  }, []);

  if (isError) {
    return notFound();
  }

  return (
    <section className="max-w-6xl w-full px-6 md:px-10 lg:px-0 flex items-start lg:items-center justify-start gap-3 my-4">
      <div className=" w-full flex flex-col justify-start items-start">
        <h1 className="font-inter font-semibold text-2xl text-black">
          {store?.name ?? <Skeleton width={200} />}
        </h1>
        <div className="flex gap-2 justify-center items-center">
          <FontAwesomeIcon className="text-gray-500" icon={faLocationDot} />
          {!store?.address ? (
            <Skeleton width={200} />
          ) : (
            <Link
              className="text-gray-500 underline hover:no-underline"
              href={`${store?.address}`}
            >
              {store?.address}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default PresentationStore;
