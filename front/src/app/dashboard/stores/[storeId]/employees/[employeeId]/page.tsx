"use client";

export default function EmployeeDetails({ params }: { params: { employeeId: string } }) {
    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                Details of employee {params.employeeId}
            </div>
        </section>
    )
}
