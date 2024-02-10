import React, {
  FC,
  Fragment,
  HtmlHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import CalendarCarousel from "../Slider/CalendarCarousel";
import { useLazyGetEmployeeBookingsQuery } from "@/lib/services/bookings";
import { useGetStoreSchedulesQuery } from "@/lib/services/stores";
import Skeleton from "react-loading-skeleton";
import { useLazyGetUserSchedulesQuery } from "@/lib/services/user";
import LoaderSimple from "../Ui/Loader/LoaderSimple";
import Card from "../cards/CardBase";
import {
  getUserCookie,
  removeKeyCookie,
  setUserCookie,
} from "@/lib/helpers/UserHelper";
import { Button } from "../Ui/ButtonShadcn";



type CustomCalendarProps = {
  idStore: string;
  idEmployee?: string;
  onSelectDate: (date?: Date) => void;
  date?: Date;
};

const CustomCalendar: FC<CustomCalendarProps> = ({
  idEmployee,
  idStore,
  onSelectDate,
  date,
}) => {
  const [getEmployeeBookings, { isFetching, isError, data }] =
    useLazyGetEmployeeBookingsQuery();

  const [
    getUserSchedulesQuery,
    { isFetching: isUserSchedulesLoading, data: userSchedules },
  ] = useLazyGetUserSchedulesQuery();

  const { data: schedules, isFetching: isSchedulesLoading } =
    useGetStoreSchedulesQuery(idStore);

  useEffect(() => {
    if (!idEmployee) return;
    getEmployeeBookings(idEmployee, true);
    getUserSchedulesQuery(idEmployee, true);
  }, [idEmployee]);

  useEffect(() => {
    (async () => {
      const session = await getUserCookie();
      if (Object.keys(session?.dateRdv || {}).length > 0) {
        if (session?.dateRdv) {
          onSelectDate(new Date(session?.dateRdv));
        }
      }
    })();
  }, []);

  const employeeDaysoff = useCallback(
    () =>
      data?.["hydra:member"]
        .concat((schedules?.["hydra:member"] || []) as [])
        .concat((userSchedules?.["hydra:member"] || []) as [])
        .filter((booking) => booking.startDate && booking.endDate)
        .map((booking) => {
          return {
            start: new Date(booking.startDate),
            end: new Date(booking.endDate),
          };
        }),
    [data, schedules, userSchedules]
  );

  const handleOnSelectDate = async (date?: Date) => {
    if (!date) {
      await removeKeyCookie("dateRdv");
    } else {
      await setUserCookie(undefined, {
        dateRdv: date,
      });
    }
    onSelectDate(date);
  };

  return (
    <>
      <h3 className="mt-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
        <span className=" h-5 w-5 text-sm bg-blue-500 text-white rounded-full flex justify-center items-center mr-2">
          2
        </span>
        Date et heure sélectionnées
      </h3>
      <Card className=" mt-0 px-6 py-3">
        {date ? (
          <div className="w-full flex justify-between items-center">
            <h3 className="text-md font-light tracking-tight text-gray-900 dark:text-white">
              {new Intl.DateTimeFormat("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              }).format(new Date(date))}
              <span className="text-sm mx-2">●</span>
              <span>
                à{" "}
                {new Intl.DateTimeFormat("fr-FR", {
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(date))}
              </span>
            </h3>
            <Button
              variant="link"
              className="text-blue-500 p-0"
              onClick={() => {
                handleOnSelectDate();
              }}
            >
              Changer
            </Button>
          </div>
        ) : (
          <div className="pt-4 pb-8 py-4 px-10">
            {(isSchedulesLoading || isFetching || isUserSchedulesLoading) && (
              <div className="flex justify-center items-center absolute z-20 w-full h-full left-0 bg-white bg-opacity-70">
                <LoaderSimple className="h-12 w-12" />
              </div>
            )}
            {isSchedulesLoading ? (
              <Skeleton count={15} className="my-4" />
            ) : (
              <CalendarCarousel
                offPeriods={employeeDaysoff()}
                isLoading={
                  isSchedulesLoading || isFetching || isUserSchedulesLoading
                }
                onSelectDate={handleOnSelectDate}
              />
            )}
          </div>
        )}
      </Card>
    </>
  );
};

export default CustomCalendar;
