import { Button } from "@/components/Ui/Button";
import { Service } from "@/types/Service";
import React, { FC } from "react";

type StoreServiceCardProps = {
  services: Array<Service>;
};

const StoreServicesCard: FC<StoreServiceCardProps> = ({ services }) => {
  return (
    <div className="rounded-lg border border-1 border-gray-300 shadow-lg">
      {services.map((service, index) => (
        <>
          <div
            key={service.name}
            className="flex justify-between py-3 px-4 items-center"
          >
            <span className="text-black flex-1">{service.name}</span>
            <span className="text-gray-500 flex-1">
              3 heures • {service.price}€
            </span>
            <div>
              <Button> Choisir</Button>
            </div>
          </div>
          {index !== services.length - 1 && <hr />}
        </>
      ))}
    </div>
  );
};

export default StoreServicesCard;
