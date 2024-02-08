"use client";

export default function EditStoreServices() {
    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 text-center">
                        Edit Store Services
                    </h2>
                    <p className="text-center">Edit the services of your store</p>

                    <div className="max-w-screen-xl px-4 py-4 mx-auto text-center lg:py-8 lg:px-6">
                        <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-2 dark:text-white">
                            <div className="flex flex-col items-center justify-center">
                                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">5</dt>
                                <dd className="font-light text-gray-500 dark:text-gray-400">Services</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    )
}
