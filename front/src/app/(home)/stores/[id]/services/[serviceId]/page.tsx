"use client";

import CustomCalendar from "@/components/Calendar/CustomCalendar";
import PresentationStore from "@/components/Pages/Store/Reservation/PresentationStore";
import SelectionService from "@/components/Pages/Store/Reservation/SelectionService";
import { Store } from "@/types/Store";
import { User } from "@/types/User";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";
import Skeleton from "react-loading-skeleton";

const Reservation: FC<
  ServerSideComponentProp<{ id: string; serviceId: string }>
> = ({ params: { id, serviceId } }) => {
  const [store, setStore] = useState<undefined | Store>();
  const [selectedEmployee, setSelectedEmployee] = useState<undefined | User>();

  

  return (
    <main className="mt-6 flex justify-center">
      <div className="max-w-4xl w-full px-6 md:px-10 lg:px-0 gap-4 flex flex-col">
        <PresentationStore storeId={id} callBack={setStore} />
        {!store ? (
          <Skeleton count={10} />
        ) : (
          <SelectionService
            idStore={id}
            serviceId={serviceId}
            collaborators={store.users}
            callBackUser={(user) => {
              console.log(user);

              setSelectedEmployee(user);
            }}
          />
        )}

        {!store ? (
          <Skeleton count={30} />
        ) : (
          <CustomCalendar
            idEmployee={selectedEmployee?.id?.toString()}
            idStore={id}
          />
        )}
      </div>
    </main>
  );
};

export default Reservation;
