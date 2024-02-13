import { faExclamationCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ErrorBaseShow() {
  return (
    <div className="flex  w-full  border border-red-500 rounded-lg py-5 items-center gap-2 px-5">
      <FontAwesomeIcon
        className="text-red-500 text-lg"
        icon={faExclamationTriangle}
      />
      <p className="text-red-500 text-[15px] font-inter font-medium	">Une erreur est survenue</p>
    </div>
  );
}

export default ErrorBaseShow;
