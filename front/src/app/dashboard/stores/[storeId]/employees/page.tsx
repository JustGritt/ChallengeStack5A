"use client";

import { useState, useEffect } from 'react';
import { Employee } from "@/types/User";

export default function Employees({ params }: { params: { storeId: string } }) {

    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(() => {
        fetch(`https://api.odicylens.com/stores/${params.storeId}`)
            .then(response => response.json())
            .then(data => setEmployees(data));
    }, []);

    console.log("employees", employees)

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    <ul className="bg-white dark:bg-gray-700 p-4 rounded-xl flex flex-col">
                        {
                            employees.length > 0 ? (
                                employees.map((employee) => (
                                    <a href={`/dashboard/employees/${employee.id}`} key={employee.id}>
                                        <li className="flex justify-between gap-x-6 p-6">
                                            <div className="flex min-w-0 gap-x-4">
                                                <div className="h-12 w-12 flex-none rounded-full bg-gray-200 grid place-items-center font-bold">{employee.name.charAt(0)}</div>
                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{employee.name}</p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                                                </div>
                                            </div>
                                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
                                            </div>
                                        </li>
                                    </a>
                                ))
                            ) : (
                                <p>No employees yet</p>
                            )
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}
