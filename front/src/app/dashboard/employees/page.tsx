"use client";
import DashboardMenu from '../DashboardMenu'

export default function Employees() {

    return (
        <>
        <div>
            <DashboardMenu />
            <div className="lg:pl-72">
                <main className="block min-h-screen">
                    <div className="px-4 sm:px-6 lg:px-8 h-full">
                        This is the Employees page
                    </div>
                </main>
            </div>
        </div>
        </>
    )
}
