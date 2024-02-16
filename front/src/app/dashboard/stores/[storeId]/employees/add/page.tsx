"use client";

import NewEmployee from "@/components/Forms/NewEmployee";
import Breadcrumb from "@/components/Header/Breadcrumb";

export default function StoreNewEmployee() {
    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <Breadcrumb />
                <NewEmployee />
            </div>
        </section>
    )
}
