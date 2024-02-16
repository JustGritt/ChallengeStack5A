import { Button } from "@/components/Ui/ButtonShadcn";
import Card from "@/components/cards/CardBase";
import {
  useCreateBookingMutation,
  useGetStoreBookingsQuery,
} from "@/lib/services/bookings";
import { Service } from "@/types/Service";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { FC, useCallback } from "react";
import { useToast } from "@/components/Ui/use-toast";
import { StripeLogo } from "@/components/Icons/Icons";
import { HydraError } from "@/types/HydraPaginateResp";
import { cn } from "@/lib/utils";
import {
  useGetStoreFreeSchedulesQuery,
  useGetStoreSchedulesQuery,
  useLazyGetStoreFreeSchedulesQuery,
} from "@/lib/services/stores";
import { Schedule } from "@/types/Schedule";
import { filterSchedulesInsideRange } from "@/lib/helpers/CalendarCarousselHelper";
import { removeKeyCookie, removeUserCookie } from "@/lib/helpers/UserHelper";
import moment from "moment";
import { BooKingPost } from "@/types/Booking";
import Pay from "@/components/payment/payment";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";

type ValidationCardProps = {
  service: Service;
  startDate: Date;
  employee: string;
};

const ValidationCard: FC<ValidationCardProps> = ({
  service,
  employee,
  startDate,
}) => {
  const { toast } = useToast();
  const [
    createBooking,
    {
      isError: isErrorCreateBooking,
      data: booking,
      isLoading: isLoadingCreateBooking,
    },
  ] = useCreateBookingMutation();

  const { data: schedules, isFetching: isSchedulesLoading } =
    useGetStoreSchedulesQuery(service.store.split("/")[2]);

  const { data: storeBookings, isFetching: isStoreBookingsLoading } =
    useGetStoreBookingsQuery(service.store.split("/")[2]);

  const { data: freeSchedules, isFetching: isFreeSchedulesLoading } =
    useGetStoreFreeSchedulesQuery(service.store.split("/")[2]);

  const router = useRouter();
  const user = useSelector(selectCurrentUser);

  const handleSubmit = useCallback(async () => {
    const myDate = moment(startDate)
      .toISOString(true)
      .slice(0, -6)
      .replace("T", " ");

    const availableEmployee = filterSchedulesInsideRange(
      new Date(myDate),
      freeSchedules ?? [],
      service.time
    );

    if (availableEmployee.length === 0) {
      toast({
        className: cn(
          "fixed top-4 z-[100] flex max-h-screen w-full flex-col-reverse items-start py-4 px-4 right-4  sm:flex-col md:max-w-[420px]"
        ),
        title: `No available employee`,
        description: `The selected time is not available. Please choose another time or date.`,
        variant: "destructive",
      });
      return;
    }

    const employeeToUse =
      availableEmployee.length > 0 ? availableEmployee[0] : freeSchedules?.[0];
    
    return
    try {
      await Pay({
        employee:
          employee === "no-one"
            ? `/users/${employeeToUse?.employee.id}`
            : `/users/${employee}`,
        service: "/services/" + service.id,
        startDate: myDate,
        amount: service.price,
        serviceName: service.name,
        email: user?.email,
      });
    } catch (error) {
      toast({
        className: cn(
          "fixed top-4 z-[100] flex max-h-screen w-full flex-col-reverse items-start py-4 px-4 right-4  sm:flex-col md:max-w-[420px]"
        ),
        title: `Something went wrong`,
        description: `Please try again later.`,
        variant: "destructive",
      });
    }
  }, [
    schedules,
    storeBookings,
    employee,
    freeSchedules,
    startDate,
    service,
    user,
  ]);

  return (
    <section className="flex flex-col w-full">
      <h3 className="my-3 text-lg font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
        <span className=" h-5 w-5 text-sm bg-blue-500 text-white rounded-full flex justify-center items-center mr-2">
          4
        </span>
        Validation sans paiement
      </h3>

      <Card>
        <div>
          <h4 className="text-lg font-bold tracking-tight text-black dark:text-white">
            Récapitulatif de la réservation
          </h4>
          <hr className="my-4" />
          <div className="flex justify-between w-full">
            <h3>{service.name}</h3>
            <p>{service.price}€</p>
          </div>
          <hr className="my-4" />
        </div>
        <div>
          <h4 className="text-[15px] font-bold tracking-tight text-gray-700 dark:text-white">
            Politique Odicylens
          </h4>
          <p className="text-[13px] font-light tracking-tight text-gray-400 dark:text-white">
            Chez nous, nous croyons en une expérience de réservation qui soit
            non seulement pratique et efficace, mais aussi chaleureuse et
            accueillante. Notre politique de réservation est conçue pour vous
            offrir la flexibilité dont vous avez besoin tout en garantissant une
            expérience sans tracas et agréable.
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          isLoading={isLoadingCreateBooking}
          className="mt-4 w-full py-5 flex gap-2 justify-center items-center"
        >
          <div className="flex gap-2 items-center pb-[2px] mr-1">
            <FontAwesomeIcon icon={faCreditCard} />
            Valider
          </div>
          <span>•</span>
          <StripeLogo className={`w-12`} />
        </Button>
        <p className="text-[13px] font-light italic tracking-tight text-gray-300 dark:text-white">
          Vous avez la possibilité de valider votre commande sans paiement en
          cliquant sur le bouton suivant.
        </p>
      </Card>
    </section>
  );
};

export default ValidationCard;
