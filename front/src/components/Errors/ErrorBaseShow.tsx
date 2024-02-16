import { cn } from "@/lib/utils";
import {
  faExclamationCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

type ErrorBaseShowProps = {
  text?: string;
  type?: "warning" | "error";
};

const ErrorBaseShow: FC<ErrorBaseShowProps> = ({
  text = "Une erreur est survenue",
  type = "error",
}) => {
  return (
    <div
      className={cn(
        "flex  w-full  border  rounded-lg py-5 items-center gap-2 px-5",
        {
          "border-red-500": type === "error",
          "border-yellow-500": type === "warning",
        }
      )}
    >
      <FontAwesomeIcon
        className={cn(" text-lg", {
          "text-red-500": type === "error",
          "text-yellow-500": type === "warning",
        })}
        icon={faExclamationTriangle}
      />
      <p
        className={cn(" text-[15px] font-inter font-medium	", {
          "text-red-500": type === "error",
          "text-yellow-500": type === "warning",
        })}
      >
        {text}
      </p>
    </div>
  );
};

export default ErrorBaseShow;
