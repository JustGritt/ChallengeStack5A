import { IAlert, IAlertProps } from "@/types/Alert";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React, {
  FC,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from "react";
import toast, { Toast } from "react-hot-toast";

type IAlertSuccess = {
  onClose: () => void;
};

const AlertSuccess: FC<IAlert & IAlertSuccess> = ({
  title,
  description,
  confirmBtn: { name = "OK", onPress },
  onClose,
}) => {
  return (
    <div
      className={`${"animate-enter"} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p
              dangerouslySetInnerHTML={{ __html: description }}
              className="mt-1 text-sm text-gray-500"
            />
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => {
            if (onClose) onClose();
          }}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertSuccess;
