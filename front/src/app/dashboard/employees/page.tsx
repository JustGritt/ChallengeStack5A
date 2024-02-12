"use client";

import { User } from "@/types/User";
import { Store } from "@/types/Store";
import { useState, useEffect, use } from 'react';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/services/slices/authSlice";

export default function Employees() {
    const [stores, setStores] = useState<Store[]>([]);
    const [employees, setEmployees] = useState<User[]>([]);
    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        if (user) {
            fetch(`https://api.odicylens.com/companies/${user?.companie?.id}`, { method: "GET" })
                .then((res) => res.json())
                .then((data) => { setStores(data.stores) });
        }
    }, [user]);

    useEffect(() => {
        if (stores && stores.length > 0) {
            const allEmployees: User[] = [];
            Promise.all(stores.map(store =>
                fetch(`https://api.odicylens.com/stores/${store.id}`, { method: "GET" })
                    .then(res => res.json())
                    .then(data => allEmployees.push(...data.users))
            )).then(() => setEmployees(allEmployees));
        }
    }, [stores]);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
                    {
                        employees.length === 0 ? (
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 inline">Your Employees</h2>
                                <p className="text-gray-500">No employees found</p>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 inline">Your Employees ({employees.length})</h2>
                                <ul className="mt-8 grid grid-cols-2 gap-4">
                                    {
                                        employees.map((employee) => (
                                            <li key={employee.id} className="flex justify-between gap-6 w-full rounded px-4 hover:bg-gray-100 shadow">
                                                <div className="flex min-w-0 gap-4 py-4">
                                                    <div className="h-12 w-12 flex-none rounded-full bg-gray-200 grid place-items-center font-bold">{employee.firstname.charAt(0)}</div>
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{employee.firstname}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{employee.email}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
