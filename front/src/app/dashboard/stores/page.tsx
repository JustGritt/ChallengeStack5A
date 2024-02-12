"use client";

import { Store } from "@/types/Store";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { BuildingStorefrontIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

export default function Stores() {

    const [currentPage, setCurrentPage] = useState(1);
    const [stores, setStores] = useState<Store[]>([]);
    const [displayedStores, setDisplayedStores] = useState<Store[]>([]);
    const [pages, setPages] = useState<number[]>([]);
    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        if (user) {
            fetch(`https://api.odicylens.com/companies/${user?.companie?.id}`, { method: "GET" })
                .then((res) => res.json())
                .then((data) => { setStores(data.stores) });
        }
    }, [user]);

    useEffect(() => {
        if (stores) {
            const pages = Math.ceil(stores.length / 5);
            setPages(new Array(pages).fill(0).map((_, index) => index + 1));
            setDisplayedStores(stores.slice(0, 5));
        }
    }, [stores]);

    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
            setDisplayedStores(stores.slice(currentPage * 5, (currentPage + 1) * 5));
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setDisplayedStores(stores.slice((currentPage - 2) * 5, (currentPage - 1) * 5));
        }
    }

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 pt-8 pb-4 rounded-xl shadow border">
                    {
                        stores ? (
                            <section>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 inline">Your Stores</h2>
                                    <Link href="/dashboard/stores/new" className="text-sm font-medium rounded-lg disabled:pointer-events-none disabled:opacity-50 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 h-10 px-4 py-2 mr-4">
                                        <BuildingStorefrontIcon className="h-5 w-5 inline-block -mt-1 mr-2" />
                                        New store
                                    </Link>
                                </div>
                                    <ul>
                                        {
                                            displayedStores.map((store, index) => (
                                                <li key={store.id} className="flex justify-between gap-x-6 py-5 px-4 rounded hover:bg-gray-100 transition-colors flex-col sm:flex-row hover:text-indigo-600">
                                                    <div className="flex min-w-0 gap-x-4">
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-lg font-semibold leading-6 text-gray-900">{store.name}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{store.address}, {store.postalCode} {store.city}, {store.country}</p>
                                                        </div>
                                                    </div>
                                                    <div className="shrink-0 flex items-end gap-4">
                                                        <a href={"/dashboard/stores/" + store.id} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-indigo-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 mt-2">
                                                            <ShoppingBagIcon className="h-4 w-4 inline-block mr-2" />
                                                            View store
                                                        </a>
                                                        <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mt-2">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>

                                    {
                                        pages.length > 1 ? (
                                            <section className="flex items-center justify-between border-t border-gray-200 bg-white px-4 pt-8 pb-4">
                                                <div className="flex flex-1 justify-between sm:hidden">
                                                    <button type="button" onClick={handlePreviousPage} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                        Previous
                                                    </button>
                                                    <button type="button" onClick={handleNextPage} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                        Next
                                                    </button>
                                                </div>
                                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                                    <div>
                                                        <p className="text-sm text-gray-700">
                                                            Showing <span className="font-medium"> {currentPage * 5 - 4} </span> to <span className="font-medium">{currentPage * 5 > stores.length ? stores.length : currentPage * 5} </span> of{' '} <span className="font-medium">{stores.length}</span> results
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                                            <button type="button" onClick={handlePreviousPage} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                                                <span className="sr-only">Previous</span>
                                                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                                            </button>

                                                            {
                                                                pages.map((page) => (
                                                                    currentPage === page ? (
                                                                        <a href="#" aria-current="page" key={page}
                                                                            className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                                            { page }
                                                                        </a>
                                                                    ) : (
                                                                        <a href="#" key={page}
                                                                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                                                            { page }
                                                                        </a>
                                                                    )
                                                                ))
                                                            }
                                                            <button type="button" onClick={handleNextPage} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                                                <span className="sr-only">Next</span>
                                                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                                            </button>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </section>
                                        ) : (
                                            <section className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                                                <div className="text-center">
                                                    <h1 className="text-9xl mb-8 animate-bounce">
                                                        🏃
                                                    </h1>
                                                    <strong className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                                        Loading...
                                                    </strong>
                                                    <p className="mt-6 text-base leading-7 text-gray-600">
                                                        We are fetching the stores for you.
                                                    </p>
                                                    <div className="mt-10 flex items-center justify-center gap-x-6 flex-col">
                                                        Taking too long?
                                                        <a href="/login" className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                            Go back
                                                        </a>
                                                    </div>
                                                </div>
                                            </section>
                                        )
                                    }
                            </section>
                        ) : (
                            <section className="grid place-items-center">
                                <h1 className="text-9xl mb-8">
                                    🤝
                                </h1>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                                    You are not associated with any company yet
                                </h2>
                                <a href="/affiliate" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Become an affiliate</a>
                            </section>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
