"use client";
import DashboardMenu from '../DashboardMenu'

export default function Statistics() {

    return (
        <>
        <div>
            <DashboardMenu />
            <div className="lg:pl-72">
                <main className="block min-h-screen">
                    <div className="px-4 sm:px-6 lg:px-8 h-full">
                        This is the Statistics page
                    </div>
                </main>
            </div>
        </div>
        </>
    )
}
