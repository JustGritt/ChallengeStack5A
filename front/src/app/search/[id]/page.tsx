import CustomMap from "@/components/cards/map/CustomMap";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Page() {
    return (
        <main className="w-full z-40 flex flex-col bg-white py-4 px-3 items-center">
            <section className="lg:w-[75%] w-full flex lg:flex-row lg:items-start flex-col items-center justify-start gap-3">
                <div className=" w-full flex flex-col justify-start items-start">
                    <h1 className="font-inter font-semibold text-2xl text-black">StoreCard</h1>
                    <div className="flex gap-2 justify-center items-center">
                        <FontAwesomeIcon className="text-gray-500" icon={faLocationDot} />
                        <Link className="text-gray-500 underline hover:no-underline" href={`http://maps.google.com/?q=78 Address, address 75001, Paris`}>78 Address, address 75001, Paris</Link>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <FontAwesomeIcon className="text-gray-500" icon={faStar} />
                        <span className="text-gray-500">4.3 (50 avis) • €€€</span>
                    </div>
                </div>
                <button className="p-2 bg-black text-white rounded-md w-fit">
                    Prendre&nbsp;RDV
                </button>
            </section>
            <section className="lg:w-[75%] w-full">
                <div className="w-full">
                    <img className="w-full h-[500px] object-cover" src="/logo.svg" alt="" />
                </div>
            </section>
            <section className="lg:w-[75%] w-full">
                <h2>Réserver en ligne pour un RDV chez StoreName</h2>
                <span className="text-gray-500">24h/24 - details de reservation</span>
                <div className="flex w-full justify-between gap-8">
                    <div className="w-full">
                        <h1 className="text-black font-bold text-2xl my-2">Choix de prestation</h1>
                        <div className="w-full my-4">
                            <h2 className="text-black font-bold text-xl my-2">Formules</h2>
                            <div className="rounded-lg border border-1 border-gray-300 px-6 shadow-lg">
                                <div className="flex justify-between p-4">
                                    <div>
                                        <span className="text-black">Prestation 1</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">3 heures • 300€</span>
                                    </div>
                                    <div>
                                        <button className="p-2 bg-black text-white rounded-md w-fit">
                                            Choisir
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex justify-between p-4">
                                    <div>
                                        <span className="text-black">Prestation 1</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">3 heures • 300€</span>
                                    </div>
                                    <div>
                                        <button className="p-2 bg-black text-white rounded-md w-fit">
                                            Choisir
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex justify-between p-4">
                                    <div>
                                        <span className="text-black">Prestation 1</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">3 heures • 300€</span>
                                    </div>
                                    <div>
                                        <button className="p-2 bg-black text-white rounded-md w-fit">
                                            Choisir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-4">
                            <h2 className="text-black font-bold text-xl my-2">Formules</h2>
                            <div className="rounded-lg border border-1 border-gray-300 px-6 shadow-lg">
                                <div className="flex justify-between p-4">
                                    <div>
                                        <span className="text-black">Prestation 1</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">3 heures • 300€</span>
                                    </div>
                                    <div>
                                        <button className="p-2 bg-black text-white rounded-md w-fit">
                                            Choisir
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex justify-between p-4">
                                    <div>
                                        <span className="text-black">Prestation 1</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">3 heures • 300€</span>
                                    </div>
                                    <div>
                                        <button className="p-2 bg-black text-white rounded-md w-fit">
                                            Choisir
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex justify-between p-4">
                                    <div>
                                        <span className="text-black">Prestation 1</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">3 heures • 300€</span>
                                    </div>
                                    <div>
                                        <button className="p-2 bg-black text-white rounded-md w-fit">
                                            Choisir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-4">
                            <h2 className="text-black font-bold text-xl my-2">Formules</h2>
                            <div className="rounded-lg border border-1 border-gray-300 px-6 shadow-lg">
                                <div className="flex justify-between p-4">
                                    <div>
                                        <span className="text-black">Prestation 1</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">3 heures • 300€</span>
                                    </div>
                                    <div>
                                        <button className="p-2 bg-black text-white rounded-md w-fit">
                                            Choisir
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex justify-between p-4">
                                    <div>
                                        <span className="text-black">Prestation 1</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">3 heures • 300€</span>
                                    </div>
                                    <div>
                                        <button className="p-2 bg-black text-white rounded-md w-fit">
                                            Choisir
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex justify-between p-4">
                                    <div>
                                        <span className="text-black">Prestation 1</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">3 heures • 300€</span>
                                    </div>
                                    <div>
                                        <button className="p-2 bg-black text-white rounded-md w-fit">
                                            Choisir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-4">
                            <h2 className="text-black font-bold text-xl my-2">Collaborateurs</h2>
                            <div className="rounded-lg p-6 shadow-lg flex flex-wrap gap-4">
                                <div className="w-fit rounded-lg flex flex-col items-center border border-1 border-gray-200 p-6">
                                    <span className="bg-black px-10 py-8 rounded-full">A</span>
                                    <span className="text-black">Anthoni</span>
                                </div>
                                <div className="w-fit rounded-lg flex flex-col items-center border border-1 border-gray-200 p-6">
                                    <span className="bg-black px-10 py-8 rounded-full">R</span>
                                    <span className="text-black">Reed</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-4">
                            <div className="my-4">
                                <h2 className="text-black font-bold text-xl my-2">Où est-ce qu&apos;on se situe?</h2>
                                <div className="flex gap-2 items-center">
                                    <FontAwesomeIcon className="text-gray-500" icon={faLocationDot} />
                                    <Link className="text-gray-500 underline hover:no-underline" href={`http://maps.google.com/?q=78 Address, address 75001, Paris`}>78 Address, address 75001, Paris</Link>
                                </div>
                            </div>
                            <CustomMap />
                        </div>
                        <div className="w-full my-4">
                            <h2 className="text-black font-bold text-xl my-2">à propos</h2>
                            <div className="rounded-lg border border-1 border-gray-300 py-8 px-6 shadow-lg">
                                <p className="text-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-[400px]">
                        <h1 className="text-black font-bold text-2xl mb-4">Horaires d&apos;ouverture</h1>
                        <div className="rounded-lg border border-1 border-gray-300 px-6 shadow-lg">
                            <div className="flex justify-between p-4">
                                <div>
                                    <span className="text-black">Lundi</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">09:00 - 19:00</span>
                                </div>
                            </div>
                            <hr />
                            <div className="flex justify-between p-4">
                                <div>
                                    <span className="text-black">Lundi</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">09:00 - 19:00</span>
                                </div>
                            </div>
                            <hr />
                            <div className="flex justify-between p-4">
                                <div>
                                    <span className="text-black">Lundi</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">09:00 - 19:00</span>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}