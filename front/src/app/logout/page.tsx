"use client"

import { resetCredentials } from "@/lib/services/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

export default function Logout() {
  const dispatch = useDispatch();
  const [cookies, _, removeCookie] = useCookies(["yoken"]);
  const router = useRouter();
  useEffect(() => {
    dispatch(resetCredentials());
    removeCookie("yoken", { path: "/" });
    router.push("/login");
  }, []);
  return (
    <section className="lg:pl-72 block min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 h-full">Merci de patienter nous vous déconnectons.</div>
    </section>
  );
}
