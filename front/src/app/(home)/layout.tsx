"use client";

import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer";
import {
  useGetMyProfileQuery,
  useLazyGetMyProfileQuery,
} from "@/lib/services/auth";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cookies, _, removeCookie] = useCookies(["yoken"]);
  const [getMyProfileAsync, { isError, isLoading, data: user }] =
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
      }
    })();
  }, []);
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
