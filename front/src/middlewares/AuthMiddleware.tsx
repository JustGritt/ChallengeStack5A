"use client";

import { useLazyGetMyProfileQuery } from "@/lib/services/auth";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";
import { BarLoader } from "react-spinners";
import Navigate from "@/components/Navigate";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type AuthMiddlewareProps = {
  children: JSX.Element;
};

const AuthMiddleware: FC<AuthMiddlewareProps> = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  const [cookies, _, removeCookie] = useCookies(["yoken"]);
  const [getMyProfileAsync, { isError, isLoading, data }] =
    useLazyGetMyProfileQuery();
  const router = useRouter();
  const [hasError, setHasError] = useState(false);

  const token = cookies.yoken;
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
        setHasError(true);
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
