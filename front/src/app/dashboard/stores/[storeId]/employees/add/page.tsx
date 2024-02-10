"use client";

import Breadcrumb from "@/components/Header/Breadcrumb";

export default function StoreNewEmployee() {
    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <Breadcrumb />
                <div className="mt-4 mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    Add new employee
                </div>
            </div>
        </section>
    )
}
