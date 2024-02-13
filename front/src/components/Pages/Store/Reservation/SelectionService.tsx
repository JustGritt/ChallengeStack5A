"use client";
import { Button } from "@/components/Ui/ButtonShadcn";
import { Avatar, AvatarFallback } from "@/components/Ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Ui/select";
import { getUserInitials, humanizeMinutes } from "@/lib/helpers/utils";
import { useLazyGetStoreServiceQuery } from "@/lib/services/services";
import { User } from "@/types/User";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Card from "@/components/cards/CardBase";
import ErrorBaseShow from "@/components/Errors/ErrorBaseShow";
import { getUserCookie, setUserCookie } from "@/lib/helpers/UserHelper";
import { Service } from "@/types/Service";
import { randomUUID } from "crypto";

type SelectionServiceProps = {
  idStore: string;
  serviceId: string;
  selectedEmployeeId?: string;
  collaborators: Array<User>;
  callBackUser: (collaboratorId: string, initializeValue?: boolean) => void;
  callBackService: (service: Service) => void;
};

const SelectionService: FC<SelectionServiceProps> = ({
  collaborators = [],
  callBackUser,
  callBackService,
  idStore,
  selectedEmployeeId,
  serviceId,
}) => {
  const [getStoreService, { data: service, isError }] =
    useLazyGetStoreServiceQuery();

  const router = useRouter();
  useEffect(() => {
    (async () => {
      await getStoreService([idStore, serviceId], false)
        .unwrap()
        .then((resp) => {
          callBackService(resp);
        });
      if (collaborators.length === 0) return;
      const session = await getUserCookie();
      if (Object.keys(session?.collaboratorChoosen || {}).length > 0) {
        if (
          collaborators.filter(
            (collaborator) =>
              collaborator.id?.toString() === session?.collaboratorChoosen
          ).length > 0
        ) {
          callBackUser(session?.collaboratorChoosen, true);
        }
      }
    })();
  }, [idStore, serviceId]);

  const onSelect = async (userId: string) => {
    callBackUser(userId);
    await setUserCookie(undefined, {
      collaboratorChoosen: userId,
    });
  };

  return (
    <div>
      <h3 className="mb-3 text-lg font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
        <span className=" h-5 w-5 text-sm bg-blue-500 text-white rounded-full flex justify-center items-center mr-2">
          1
        </span>
        Service sélectionnée
      </h3>
      <Card className="px-6 py-3  flex justify-between">
        {isError ? (
          <ErrorBaseShow />
        ) : (
          <>
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
                  {humanizeMinutes(service?.time)} •{" "}
                  <span className="text-black">{service?.price}€</span>
                </p>
              )}
            </div>
            <div className="flex flex-row items-center gap-4">
              {collaborators.length > 0 && (
                <Select
                  defaultValue={"no-one"}
                  value={selectedEmployeeId}
                  onValueChange={onSelect}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Avec qui ?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={"no-one"} value={"no-one"}>
                      <div className="flex items-center h-8">
                        <span className="ml-2 ">Tout le monde</span>
                      </div>
                    </SelectItem>
                    {collaborators.map((collaborator, i) => (
                      <SelectItem
                        key={collaborator.id}
                        value={collaborator.id.toString()}
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
          </>
        )}
      </Card>
    </div>
  );
};

export default SelectionService;
