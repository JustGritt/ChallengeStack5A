"use client";

import {  removeUserCookie } from "@/lib/helpers/UserHelper";
import { resetCredentials } from "@/lib/services/slices/authSlice";
import { UserCookieType } from "@/types/User";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(resetCredentials());
    removeUserCookie(UserCookieType.SESSION);
    router.push("/login");
  }, []);
  return (
    <main className="lg:pl-72 block min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 h-full">
        Merci de patienter nous vous déconnectons.
      </div>
    </main>
  );
}
