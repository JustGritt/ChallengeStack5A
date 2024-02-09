"use client";

import React, { FC } from "react";
import Slider from "react-slick";

import useCalendar from "use-calendar-react-hook";
import {
  getIntlDayAndMonth,
  getWorkinHours,
  isOffHour,
} from "@/lib/helpers/CalendarCarousselHelper";
import { calendarCarouselSettings } from "@/lib/constants/carousselConfig";
import { cn } from "@/lib/utils";
type CalendarCarouselProps = {
  offPeriods?: Array<{
    start: Date;
    end: Date;
  }>;
};

const CalendarCarousel: FC<CalendarCarouselProps> = ({ offPeriods = [] }) => {
  const { currentScope } = useCalendar();

  return (
    <Slider {...calendarCarouselSettings}>
      {currentScope.map(({ date }, i) => {
        const { day, month, dayWeek } = getIntlDayAndMonth(date, "fr-FR");

        const workinHours = getWorkinHours(date);

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
                    const isOff = isOffHour(
                      military_format,
                      new Date(date),
                      offPeriods
                    );
                    return (
                      <span
                        className={cn(
                          "block bg-gray-200 hover:bg-gray-500 cursor-pointer w-32 py-1.5 text-center rounded text-sm",
                          {
                            "bg-transparent line-through text-gray-300 hover:bg-transparent cursor-not-allowed":
                              isOff,
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
