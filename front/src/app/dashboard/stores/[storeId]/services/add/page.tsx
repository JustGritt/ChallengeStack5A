"use client";

import Breadcrumb from "@/components/Header/Breadcrumb";

export default function EditStoreServices() {

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <Breadcrumb />
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 text-center">
                        Edit Store Services
                    </h2>
                    <p className="text-center">Edit the services of your store</p>
                </div>
            </div>
        </section>
    )
}
