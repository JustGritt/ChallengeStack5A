"use client";
import { useState, useEffect } from 'react';
export default function Employees({ params }: { params: { id: string } }) {

    interface Employee {
        "id": number,
        "email": string,
        "roles": string[],
        "firstname": string,
    }

    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(() => {
        fetch(`https://api.odicylens.com/stores/2`)
            .then(response => response.json())
            // .then(data => setEmployees(data));
    }, []);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <ul className="bg-white dark:bg-gray-700 p-4 rounded-xl flex flex-col">
                    {/* {employees.map((employee) => (
                        <a href={`/dashboard/employees/${employee.id}`} key={employee.id}>
                            <li className="flex justify-between gap-x-6 p-6">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="h-12 w-12 flex-none rounded-full bg-gray-200 grid place-items-center font-bold">{employee.firstname.charAt(0)}</div>
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{employee.firstname}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
                                </div>
                            </li>
                        </a>
                    ))} */}
                </ul>
            </div>
        </section>
    )
}
