import { classNames } from "@/lib/helpers/utils";
import { cn } from "@/lib/utils";
import React, { FC } from "react";

type CardBaseProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

const Card: FC<CardBaseProps> = ({ children, className, as = "div" }) => {
  const As = as;
  return (
    <As
      className={cn(
        "rounded-lg border border-1 border-gray-300 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-4 px-10 relative overflow-hidden",
        className
      )}
    >
      {children}
    </As>
  );
};

export default Card;
