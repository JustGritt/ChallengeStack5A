"use client";

import React, { FC, useEffect } from "react";
import { Label } from "@/components/Ui/label";
import { Input } from "@/components/Ui/input";
import Card from "@/components/cards/CardBase";
import { Button } from "@/components/Ui/ButtonShadcn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getFullUrlPath } from "@/lib/helpers/RegisterLoginSectionHelpers";
import { usePathname, useRouter } from "next/navigation";
import absoluteUrl from "next-absolute-url";
import type { GetServerSideProps, NextPage } from "next";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";
import { capitalize } from "@/lib/helpers/utils";

type RegisterLoginSectionProps = {};


const RegisterLoginSection: FC<RegisterLoginSectionProps> = ({}) => {
  const [fullUrl, setFullUrl] = React.useState<string>("");

  const pathname = usePathname();

  useEffect(() => {
    const host = window.location.host;
    const baseurl = `http://${host}${pathname}`;
    setFullUrl(baseurl);
  }, [pathname]);

  const user = useSelector(selectCurrentUser);

  return (
    <section>
      <h3 className="my-3 text-lg font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
        <span className=" h-5 w-5 text-sm bg-blue-500 text-white rounded-full flex justify-center items-center mr-2">
          3
        </span>
        Identification
      </h3>
      <Card className="flex justify-start">
        {user ? (
          <div className="w-full">
            <h3 className="text-md font-light tracking-tight text-gray-900 dark:text-white">
              {capitalize(user.firstname)}
              <span className="text-sm mx-2">●</span>
              {user.email}
            </h3>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href={`/register/?redirectUrl=${fullUrl}`}>
              <Button>
                <FontAwesomeIcon className="mr-3" icon={faLock} />
                S'enregistrer
              </Button>
            </Link>
            <Link href={`/login/?redirectUrl=${fullUrl}`}>
              <Button variant="outline">
                <FontAwesomeIcon className="mr-3" icon={faUserAlt} />
                Se connecter
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </section>
  );
};

export default RegisterLoginSection;
