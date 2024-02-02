"use client";
import { useState, useEffect } from 'react';

export default function Employees() {

    interface Employee {
        id: number;
        name: string;
    }

    // TODO: Get the list of employees from the API (replace once the api is ready)
    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setEmployees(data));
    }, []);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <ul className="bg-white dark:bg-gray-700 p-4 rounded-xl flex flex-col">
                    {employees.map((employee) => (
                        <a href={`/dashboard/employees/${employee.id}`} key={employee.id}>
                            <li className="w-full block p-4 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-black dark:text-gray-300">
                                {employee.name}
                            </li>
                        </a>
                    ))}
                </ul>
            </div>
        </section>
    )
}
