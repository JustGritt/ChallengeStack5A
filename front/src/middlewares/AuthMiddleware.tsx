"use client";

import { useLazyGetMyProfileQuery } from "@/lib/services/auth";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  setCredentials,
} from "@/lib/services/slices/authSlice";
import { BarLoader } from "react-spinners";
import Navigate from "@/components/Navigate";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User, UserCookieType } from "@/types/User";
import {
  getUserCookie,
  removeUserCookie,
  setUserCookie,
} from "@/lib/helpers/UserHelper";

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

  return user ? (
    children
  ) : hasError ? (
    <Navigate to="/login" replace />
  ) : (
    <BarLoader
      color="#36d7b7"
      className="absolute bottom-0 left-0 right-0 top-0"
    />
  );
};

export default AuthMiddleware;
