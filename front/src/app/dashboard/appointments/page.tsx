"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUserConfig } from "@/lib/services/slices/authSlice";

import UserCalendar from "@/components/Calendar/EmployeeCalendar";
import EmployeeTableCalendar from "@/components/Calendar/EmployeeTableCalendar";
import ClientCalendar from "@/components/Calendar/ClientCalendar";

export default function Page() {
  const userConfig = useSelector(selectCurrentUserConfig);
  const userRoles = useMemo(
    () =>
      Object.keys(userConfig).filter(
        (role) => !!userConfig[role as keyof typeof userConfig]
      ),
    [userConfig]
  );

  return (
    <section className="lg:pl-72 block min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 h-full">
        <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
          {userRoles.includes("isOwner") && (
            <div className="lg:flex lg:h-full lg:flex-col">
              <EmployeeTableCalendar />
            </div>
          )}

          {userRoles.includes("isWorker") && (
            <div className="lg:flex lg:h-full lg:flex-col">
              <UserCalendar />
            </div>
          )}

          {userRoles.includes("isClient") && (
            <div className="lg:flex lg:h-full lg:flex-col">
              <ClientCalendar />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
