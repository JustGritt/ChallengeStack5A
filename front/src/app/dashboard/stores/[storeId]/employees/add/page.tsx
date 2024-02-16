"use client";

import NewEmployee from "@/components/Forms/NewEmployee";
import Breadcrumb from "@/components/Header/Breadcrumb";
import { selectCurrentUserConfig } from "@/lib/services/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function StoreNewEmployee() {
  const userConfig = useSelector(selectCurrentUserConfig);
  const router = useRouter();
  return (
    <section className="lg:pl-72 block min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 h-full">
        <Breadcrumb />
        <NewEmployee />
      </div>
    </section>
  );
}
