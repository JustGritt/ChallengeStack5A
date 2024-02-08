import React, { FC } from "react";
import Slider from "react-slick";

import useCalendar from "use-calendar-react-hook";
import { nanoid } from "@reduxjs/toolkit";
import {
  getIntlDayAndMonth,
  isOffHour,
} from "@/lib/helpers/CalendarCarousselHelper";
import { calendarCarouselSettings } from "@/lib/constants/carousselConfig";
import dayHours from "@/lib/constants/day_hours.json";
import { cn } from "@/lib/utils";
type CalendarCarouselProps = {
  datas: Array<AnyProperties & { id: string }>;
};

const CalendarCarousel: FC<CalendarCarouselProps> = ({ datas }) => {
  const {
    today,
    currentScope,
    selectedDate,
    currentMonth,
    selectDate,
    navigateMonth,
  } = useCalendar();
  const options = { weekday: "long" };

  const dayOffStart = new Date(new Date().setHours(0, 0, 0, 0));

  const dayOffEnd = new Date(new Date().setHours(24 + 16, 30, 0, 0));

  return (
    <Slider {...calendarCarouselSettings}>
      {currentScope.map(({ date }, i) => {
        const { day, month, dayWeek } = getIntlDayAndMonth(date, "fr-FR");

        const workinHours = dayHours.filter((day) => {
          const militaryTime =
            parseInt(day.military_format.slice(0, 2)) * 60 +
            parseInt(day.military_format.slice(2));
          const dayOfWeek = new Date(date).getDay();

          return (
            dayOfWeek !== 0 &&
            dayOfWeek !== 6 &&
            militaryTime >= 600 &&
            militaryTime <= 1080
          );
        });

        return (
          <div className="!flex flex-col items-center" key={date}>
            <div className="w-fit">
              <div className="px-4 py-2 text-center">
                <h3 className="font-bold text-md">{dayWeek}</h3>
                <p className="text-gray-500 text-md">
                  {day} {month}
                </p>
              </div>

              <div className="gap-2 flex flex-col">
                {workinHours.map(
                  ({ twenty_four_hour_format, military_format }, i) => {
                    const isOff = isOffHour(military_format, new Date(date), [
                      {
                        startExclude: dayOffStart,
                        endExclude: dayOffEnd,
                      },
                      {
                        startExclude: new Date("2024-02-12T09:00:00"),
                        endExclude: new Date("2024-02-12T17:00:00"),
                      },
                    ]);
                    return (
                      <span
                        className={cn(
                          "block bg-gray-200 hover:bg-gray-500 cursor-pointer w-32 py-1.5 text-center rounded text-sm",
                          {
                            "bg-gray-500 cursor-not-allowed": isOff,
                          }
                        )}
                        key={twenty_four_hour_format}
                      >
                        {twenty_four_hour_format}
                      </span>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default CalendarCarousel;
