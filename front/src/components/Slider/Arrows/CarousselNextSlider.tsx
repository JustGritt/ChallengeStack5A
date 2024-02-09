import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { HtmlHTMLAttributes } from "react";

function CarousselNextArrow(props: HtmlHTMLAttributes<HTMLButtonElement>) {
  const { className, style, onClick } = props;
  return (
    <button
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "24px",
      }}
      className="-right-4"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowRight} className="text-blue-500" />
    </button>
  );
}

export default CarousselNextArrow;
