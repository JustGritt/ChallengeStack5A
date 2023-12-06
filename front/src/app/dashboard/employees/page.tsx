"use client";
import { useState, useEffect } from 'react';
import DashboardMenu from '../DashboardMenu'

export default function Employees() {

    // Get the list of employees from the API
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setEmployees(data));
    }, []);

    return (
        <>
        <div>
            <DashboardMenu />
            <div className="lg:pl-72">
                <main className="block min-h-screen">
                    <div className="sm:p-6 lg:p-8 h-full">

                        {/* List of employees */}
                        <ul className="bg-white p-4 rounded flex flex-col">
                            {employees.map((employee) => (
                                <a href={`/dashboard/employees/${employee.id}`} key={employee.id}>
                                    <li className="w-full block p-4 rounded hover:bg-gray-200">
                                        {employee.name}
                                    </li>
                                </a>
                            ))}
                        </ul>

                    </div>
                </main>
            </div>
        </div>
        </>
    )
}
