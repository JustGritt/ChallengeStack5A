"use client";

export default function EmployeeDetails({ params }: { params: { employeeId: string } }) {
    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="mx-auto bg-white dark:bg-slate-800 px-8 pt-8 pb-4 rounded-xl shadow border">
                    Details of employee {params.employeeId}
                </div>
            </div>
        </section>
    )
}
