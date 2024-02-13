"use client";

import Breadcrumb from "@/components/Header/Breadcrumb";
import NewService from "@/components/Forms/NewService";

export default function EditStoreServices() {

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <Breadcrumb />
                <NewService />
            </div>
        </section>
    )
}
