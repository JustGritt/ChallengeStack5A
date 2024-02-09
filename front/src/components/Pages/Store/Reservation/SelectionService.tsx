import { Button } from "@/components/Ui/ButtonShadcn";
import { Avatar, AvatarFallback } from "@/components/Ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Ui/select";
import { getUserInitials } from "@/lib/helpers/utils";
import { useLazyGetStoreServiceQuery } from "@/lib/services/services";
import { User } from "@/types/User";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

type SelectionServiceProps = {
  idStore: string;
  serviceId: string;
  collaborators: Array<User>;
  callBackUser: (collaborator: User) => void;
};

const SelectionService: FC<SelectionServiceProps> = ({
  collaborators = [],
  callBackUser,
  idStore,
  serviceId,
}) => {
  const [getStoreService, { data: service }] = useLazyGetStoreServiceQuery();

  const router = useRouter();
  useEffect(() => {
    getStoreService([idStore, serviceId]);
  }, []);

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        Votre prestation
      </h2>
      <div className=" px-6 py-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between">
        <div>
          {!service?.name ? (
            <Skeleton width={200} />
          ) : (
            <h3 className="font-bold text-md">{service?.name}</h3>
          )}
          {!service?.time ? (
            <Skeleton width={200} />
          ) : (
            <p className="text-gray-500 text-md">
              30min • <span className="text-black">{service?.price}€</span>
            </p>
          )}
        </div>
        <div className="flex flex-row items-center gap-4">
          {collaborators.length > 0 && (
            <Select
              onValueChange={(e) => {
                const user = JSON.parse(e) as User;
                callBackUser(user);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Avec qui ?" />
              </SelectTrigger>
              <SelectContent>
                {collaborators.map((collaborator, i) => (
                  <SelectItem
                    key={collaborator.id}
                    value={JSON.stringify(collaborator)}
                  >
                    <div className="flex items-center">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {getUserInitials(collaborator.firstname)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="ml-2">{collaborator.firstname}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button
            variant="link"
            className="text-blue-500 p-0"
            onClick={() => {
              router.push(`/stores/${idStore}`);
            }}
          >
            Changer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectionService;
