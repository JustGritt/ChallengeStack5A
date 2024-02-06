"use client";
import { useState, useEffect } from 'react';
import { Store } from "@/types/Store";

export default function Stores({ params }: { params: { storeId: string } }) {

    const [stores, setStores] = useState<Store[]>([]);
    useEffect(() => {
        fetch(`https://api.odicylens.com/companies/2`)
            .then(response => response.json())
            .then(data => console.log(data));
            // .then(data => setEmployees(data));
    }, []);

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">

            </div>
        </section>
    )
}
