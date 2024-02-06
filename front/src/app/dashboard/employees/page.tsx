"use client";
import { useState, useEffect } from 'react';
import { User } from "@/types/User";

export default function Employees() {


    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <ul className="bg-white dark:bg-gray-700 p-4 rounded-xl flex flex-col">
                    {/* {employees.map((employee) => (
                        <a href={`/dashboard/employees/${employee.id}`} key={employee.id}>
                            <li key={employee.email} className="flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="h-12 w-12 flex-none rounded-full bg-gray-50">
                                        <span>{employee.firstname.charAt(0)}</span>
                                    </div>
                                    <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{employee.firstname}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{employee.email}</p>
                                    </div>
                                </div>
                            </li>
                        </a>
                    ))} */}
                </ul>
            </div>
        </section>
    )
}
