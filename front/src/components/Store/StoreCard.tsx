import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

function StoreCard() {
  return (
    <div className="bg-white min-h-[400px] cursor-pointer hover:shadow-lg hover:z-30 shadow-gray-200 transition ease-in-out delay-150 flex items-center flex-col">
      <hr className="w-[90%] bg-gray-800" />
      <div className="flex justify-evenly items-center m-auto w-full">
        <div>
          <Image src="/logo.svg" alt="" width={300} height={300} className="w-[90%] h-[300px] object-cover" />
        </div>
        <div className="flex flex-col justify-start items-start">
          <h1 className="font-inter font-semibold text-xl text-black">StoreCard</h1>
          <div className="flex gap-2 justify-center items-center">
            <FontAwesomeIcon className="text-gray-500" icon={faLocationDot} />
            <span className="text-gray-500">78 Address, address 75001, Paris</span>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <FontAwesomeIcon className="text-gray-500" icon={faStar} />
            <span className="text-gray-500">4.3 (50 avis) • €€€</span>
          </div>
          <div className="flex flex-col w-full gap-3 mt-4">
            <div className="flex justify-between items-center w-full gap-4">
              <span className="uppercase text-gray-600 font-bold text-xs">Matin</span>
              <div className="flex gap-1">
                <span className="border border-blue-600 text-blue-600 rounded-md py-1 px-2 hover:text-white hover:bg-blue-600 transition-all">Mer.24</span>
                <span className="border border-blue-600 text-blue-600 rounded-md py-1 px-2 hover:text-white hover:bg-blue-600 transition-all">Mer.24</span>
                <span className="border border-blue-600 text-blue-600 rounded-md py-1 px-2 hover:text-white hover:bg-blue-600 transition-all">Mer.24</span>
              </div>
            </div>
            <div className="flex justify-between items-center w-full gap-4">
              <span className="uppercase text-gray-600 font-bold text-xs">Après-midi</span>
              <div className="flex gap-1">
                <span className="border border-blue-600 text-blue-600 rounded-md py-1 px-2 hover:text-white hover:bg-blue-600 transition-all">Mer.24</span>
                <span className="border border-blue-600 text-blue-600 rounded-md py-1 px-2 hover:text-white hover:bg-blue-600 transition-all">Mer.24</span>
                <span className="border border-blue-600 text-blue-600 rounded-md py-1 px-2 hover:text-white hover:bg-blue-600 transition-all">Mer.24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
