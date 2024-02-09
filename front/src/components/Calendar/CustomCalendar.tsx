import React, { FC, HtmlHTMLAttributes, useEffect } from "react";
import CalendarCarousel from "../Slider/CalendarCarousel";
import { useLazyGetEmployeeBookingsQuery } from "@/lib/services/bookings";
import { useGetStoresSchedulesQuery } from "@/lib/services/stores";
import Skeleton from "react-loading-skeleton";

type CustomCalendarProps = {
  idStore: string;
  idEmployee?: string;
};

const CustomCalendar: FC<CustomCalendarProps> = ({ idEmployee, idStore }) => {
  const [getEmployeeBookings, { isLoading, isError, data }] =
    useLazyGetEmployeeBookingsQuery();

  const { data: schedules, isLoading: isSchedulesLoading } =
    useGetStoresSchedulesQuery(idStore);

  useEffect(() => {
    if (!idEmployee) return;
    getEmployeeBookings(idEmployee);
  }, [idEmployee]);

  const employeeDaysoff = data?.["hydra:member"]
    .filter((booking) => booking.startDate && booking.endDate)
    .map((booking) => {
      return {
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      };
    });

  return (
    <div className="rounded-lg border border-1 border-gray-300 shadow-lg pb-4 px-14">
      {isSchedulesLoading ? (
        <Skeleton count={15} className="my-4" />
      ) : (
        <CalendarCarousel offPeriods={employeeDaysoff} />
      )}
    </div>
  );
};

export default CustomCalendar;
