"use client";
export default function Logout() {

    // Logout the user
    const logout = async () => {
        // localStorage.removeItem('token'); // TODO: Delete the JWT
        window.location.href = '/login';
    }

    logout();

    return (
        <section className="lg:pl-72 block min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8 text-center m-8 bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                <h1 className="text-9xl mb-8">
                    👋
                </h1>
                <p className="text-2xl font-bold tracking-tight text-gray-900 mt-4 sm:text-4xl">
                    You are now logged out.
                </p>
                <p className="mt-4 text-gray-500">
                    If you are not redirected to the Home page, click the button below.
                </p>
                <a href="/login" className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
                    Return to Home page
                </a>
            </div>
        </section>
    )
}
