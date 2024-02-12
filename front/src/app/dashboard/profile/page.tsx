"use client";

import UpdateProfile from "@/components/Forms/UpdateProfile";
import UpdatePassword from "@/components/Forms/UpdatePassword";

export default function EditProfile() {
    return (
        <main className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 h-full">
                <UpdateProfile />
                <UpdatePassword />
            </div>
        </main>
    );
}
