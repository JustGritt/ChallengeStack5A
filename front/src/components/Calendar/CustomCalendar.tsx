import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { HtmlHTMLAttributes } from "react";
import CalendarCarousel from "../Slider/CalendarCarousel";


function CustomCalendar() {


  return (
    <div className="rounded-lg border border-1 border-gray-300 shadow-lg pb-4 px-14">
      <CalendarCarousel
        datas={[
          {
            id: "1",
          },
        ]}
      />
    </div>
  );
}

export default CustomCalendar;
