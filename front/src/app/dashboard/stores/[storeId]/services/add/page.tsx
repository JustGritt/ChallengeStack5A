"use client";

import Breadcrumb from "@/components/Header/Breadcrumb";
import NewService from "@/components/Forms/NewService";
import { useSelector } from "react-redux";
import { selectCurrentUserConfig } from "@/lib/services/slices/authSlice";
import { useRouter } from "next/navigation";

export default function EditStoreServices() {
  const userConfig = useSelector(selectCurrentUserConfig);
  const router = useRouter();
    
    if (!userConfig.isOwner || !userConfig.isAdmin) {
        router.push("/dashboard");
    }


  return (
    <section className="lg:pl-72 block min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 h-full">
        <Breadcrumb />
        <NewService />
      </div>
    </section>
  );
}
