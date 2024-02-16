"use client";

import CustomCalendar from "@/components/Calendar/CustomCalendar";
import RegisterLoginSection from "@/components/Pages/Store/RegisterLoginSection";
import PresentationStore from "@/components/Pages/Store/Reservation/PresentationStore";
import SelectionService from "@/components/Pages/Store/Reservation/SelectionService";
import ValidationCard from "@/components/Pages/Store/Reservation/ValidationCard";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";
import { useGetStoreQuery } from "@/lib/services/stores";
import { Service } from "@/types/Service";
import { User } from "@/types/User";
import React, { FC, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const Reservation: FC<
  ServerSideComponentProp<{ id: string; serviceId: string }>
> = ({ params: { id, serviceId } }) => {
  const { data: store } = useGetStoreQuery(id, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });
  const [selectedEmployeeId, setSelectedEmployeeId] =
    useState<string>("no-one");
  const [selectedService, setSelectedService] = useState<undefined | Service>();
  const [selectedDate, setDate] = useState<Date | undefined>();
  const user = useSelector(selectCurrentUser);

  return (
    <main className="mt-6 flex justify-center">
      <div className="max-w-4xl w-full px-6 md:px-10 lg:px-0 gap-4 flex flex-col">
        <PresentationStore storeId={id} />
        <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Votre prestation
        </h2>
        {!store ? (
          <Skeleton count={30} />
        ) : (
          <SelectionService
            idStore={id}
            serviceId={serviceId}
            selectedEmployeeId={selectedEmployeeId}
            collaborators={store.users}
            callBackUser={(user, isInitializeValue) => {
              if (!isInitializeValue) {
                setDate(undefined);
              }
              console.log('setting user', user);
              
              setSelectedEmployeeId(user);
            }}
            callBackService={setSelectedService}
          />
        )}

        {!store ? (
          <Skeleton count={30} />
        ) : (
          <CustomCalendar
            date={selectedDate}
            idEmployee={selectedEmployeeId}
            idStore={id}
            onSelectDate={setDate}
          />
        )}
        {selectedEmployeeId && selectedDate && <RegisterLoginSection />}
        {selectedService && user && selectedDate && selectedEmployeeId && (
          <ValidationCard
            service={selectedService}
            startDate={selectedDate}
            employee={selectedEmployeeId}
          />
        )}
      </div>
    </main>
  );
};

export default Reservation;
