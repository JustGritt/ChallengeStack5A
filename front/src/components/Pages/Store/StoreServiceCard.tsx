import { Button } from "@/components/Ui/Button";
import { Service } from "@/types/Service";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type StoreServiceCardProps = {
  services: Array<Service>;
};

const StoreServicesCard: FC<StoreServiceCardProps> = ({ services }) => {
  const router = useRouter();
  return (
    <div className="rounded-lg border-1 border-gray-300 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      {services.map((service, index) => (
        <div key={service.id}>
          <div
            key={service.name}
            className="flex justify-between py-4 px-4 items-center"
          >
            <span className="text-black flex-1">{service.name}</span>
            <span className="text-gray-500 flex-1 text-end px-4">
              {service.time} • {service.price}€
            </span>
            <div>
              <Button
                onClick={() => {
                  router.push(
                    `/stores/${service.store}/services/${service.id}`
                  );
                }}
              >
                {" "}
                Choisir
              </Button>
            </div>
          </div>
          {index !== services.length - 1 && <hr className="w-[95%] mx-auto" />}
        </div>
      ))}
    </div>
  );
};

export default StoreServicesCard;
