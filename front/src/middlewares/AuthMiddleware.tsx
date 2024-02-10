"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCookieType } from "@/types/User";
import {
  removeUserCookie,
} from "@/lib/helpers/UserHelper";
import { useLazyGetMyProfileQuery } from "@/lib/services/user";

type AuthMiddlewareProps = {
  children: JSX.Element;
};

const AuthMiddleware: FC<AuthMiddlewareProps> = ({ children }) => {
  const [getMyProfileAsync] = useLazyGetMyProfileQuery();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await getMyProfileAsync().unwrap();
      } catch (e) {
        removeUserCookie(UserCookieType.SESSION);
        router.push("/login");
      }
    })();
  }, []);

  return children;
};

export default AuthMiddleware;
