"use client";

import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserCookieType } from "@/types/User";
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { setCredentials } from "@/lib/services/slices/authSlice";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const session = await getUserCookie(UserCookieType.SESSION);
      if (session.user) {
        dispatch(setCredentials({ user: session.user }));
        return;
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
