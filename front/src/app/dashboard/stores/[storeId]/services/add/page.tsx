"use client";

import Breadcrumb from "@/components/Header/Breadcrumb";

export default function EditStoreServices() {

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <Breadcrumb />
                <div className="mt-4 mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                        New Service
                    </h2>


                </div>
            </div>
        </section>
    )
}
