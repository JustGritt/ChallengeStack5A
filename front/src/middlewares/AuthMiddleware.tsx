"use client";

import { useLazyGetMyProfileQuery } from "@/lib/services/auth";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";
import { BarLoader } from "react-spinners";
import Navigate from "@/components/Navigate";
import toast from "react-hot-toast";

type AuthMiddlewareProps = {
  children: JSX.Element;
};

const AuthMiddleware: FC<AuthMiddlewareProps> = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  const [cookies, _, removeCookie] = useCookies(["yoken"]);
  const [getMyProfileAsync, { isError, isLoading }] =
    useLazyGetMyProfileQuery();

  useEffect(() => {
    (async () => {
      try {
        if (!user) {
          const token = cookies.yoken;
          if (!token) {
            throw new Error("No token");
          }
          await getMyProfileAsync(token).unwrap();
        }
      } catch (e) {
        removeCookie("yoken", { path: "/" });
        toast.error("Please login to continue");
      }
    })();
  }, []);

  return isLoading ? (
    <BarLoader color="#36d7b7" />
  ) : isError ? (
    <Navigate to="/login" replace />
  ) : (
    children
  );
};

export default AuthMiddleware;
