import { Company } from "@/types/Company";
import { Store } from "@/types/Store";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { LegacyRef, RefObject, useImperativeHandle } from "react";

export type StoreCardProps = {
  refStore: LegacyRef<HTMLDivElement>;
  store: Store;
  active?: boolean;
};

function StoreCard({
  refStore,
  store: { name, address, country, city },
  active,
}: StoreCardProps) {
  return (
    <>
      <div
        ref={refStore}
        className={`${
          active ? "shadow-xl z-40" : ""
        } bg-white px-3 min-h-[200px] cursor-pointer  hover:shadow-lg hover:z-30  transition ease-in-out delay-150 flex items-center flex-col`}
        id={name}
      >
        <div className="flex justify-evenly items-center m-auto w-full lg:flex-row flex-col lg:p-0  shadow-gray-200">
          {/* <div className="flex justify-center items-center flex-[.5]">
          <Image
            src={image}
            alt=""
            width={100}
            height={100}
            className="w-[90%] h-[150px] object-contain m-auto"
          />
        </div> */}
          <div className="flex flex-col justify-start h-full items-start flex-1 gap-2">
            <h1 className="font-inter font-semibold text-xl text-black">
              {name}
            </h1>
            <div className="flex gap-2 justify-center items-center">
              <FontAwesomeIcon className="text-gray-500" icon={faLocationDot} />
              <span className="text-gray-500">{address}</span>
            </div>
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon className="text-gray-500" icon={faStar} />
              <span className="text-gray-500">4.3 (50 avis) • €€€</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-[90%] bg-gray-800" />
    </>
  );
}

export default StoreCard;
