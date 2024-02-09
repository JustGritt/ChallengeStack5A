"use client";

export default function StoreEmployees({ params }: { params: { storeId: string } }) {
    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                All employees of store {params.storeId}
            </div>
        </section>
    )
}
