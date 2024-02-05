async function checkTokenValidity(token: string) {
    const res = await fetch(`https://api.odicylens.com/users/token/${token}`)
    const data = await res.status;
    return data;
}


export default async function Page({ params }: { params: { token: string } }) {
    const req = await checkTokenValidity(params.token);

    return (
        <section className="block min-h-screen">
            {req === 200 ? (
                <div className="p-4 sm:p-6 lg:p-8 text-center m-8 bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                    <h1 className="text-9xl mb-8">
                        🎉
                    </h1>
                    <p className="text-2xl font-bold tracking-tight text-gray-900 mt-4 sm:text-4xl">
                        Your email has been confirmed.
                    </p>
                    <p className="mt-4 text-gray-500">
                        You can now log in with your email and password.
                    </p>
                    <a href="/login" className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
                        Log in
                    </a>
                </div>
            ): null}

            {req === 403 ? (
                <div className="p-4 sm:p-6 lg:p-8 text-center m-8 bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
                    <h1 className="text-9xl mb-8">
                        🌧️
                    </h1>
                    <p className="text-2xl font-bold tracking-tight text-gray-900 mt-4 sm:text-4xl">
                        Your email has already been confirmed.
                    </p>
                    <p className="mt-4 text-gray-500">
                        You can now log in with your email and password.
                    </p>
                    <a href="/login" className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
                        Log in
                    </a>
                </div>
            ): null}
        </section>
    )
}