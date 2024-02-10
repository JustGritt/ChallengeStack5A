"use client"
import CustomMap from "@/components/cards/map/CustomMap";
import { faLocationDot, faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const data = {
    storeName: "StoreCard",
    address: "78 Address, address 75001, Paris",
    rating: "4.3",
    reviews: "50",
    price: "€€€",
    imgs: ["/logo.svg", "/logo.svg", "/logo.svg", "/logo.svg", "/logo.svg", "/logo.svg", "/logo.svg"],
    services: [
        {
            name: "Prestation 1",
            duration: "3 heures",
            price: "300€"
        },
        {
            name: "Prestation 2",
            duration: "3 heures",
            price: "300€"
        },
        {
            name: "Prestation 3",
            duration: "3 heures",
            price: "300€"
        },
        {
            name: "Prestation 4",
            duration: "3 heures",
            price: "300€"
        }
    ],
    collaborators: [
        {
            name: "Anthoni",
            img: "/logo.svg"
        },
        {
            name: "Reed",
            img: "/logo.svg"
        }
    ]
}

export default function Page() {

    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const [showAllImages, setShowAllImages] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.outerWidth <= 1024)
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <main className="w-full z-40 flex flex-col bg-white py-4 px-3 items-center">
            <section className="lg:w-[75%] w-full flex lg:flex-row items-start flex-col lg:items-center justify-start gap-3 my-4">
                <div className=" w-full flex flex-col justify-start items-start">
                    <h1 className="font-inter font-semibold text-2xl text-black">{data.storeName}</h1>
                    <div className="flex gap-2 justify-center items-center">
                        <FontAwesomeIcon className="text-gray-500" icon={faLocationDot} />
                        <Link className="text-gray-500 underline hover:no-underline" href={`${data.address}`}>{data.address}</Link>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <FontAwesomeIcon className="text-gray-500" icon={faStar} />
                        <span className="text-gray-500">
                            {data.rating} ({data.reviews}) • {data.price}
                        </span>
                    </div>
                </div>
                <button className="p-2 bg-black text-white rounded-md w-fit">
                    Prendre&nbsp;RDV
                </button>
            </section>
            <section className="lg:w-[75%] w-full flex">
                {
                    !isSmallScreen ? (
                        <div className="w-full flex gap-4 items-center">
                            {
                                data.imgs.length === 1 && (
                                    <img className="w-full max-h-[500px] object-cover rounded-lg" src={data.imgs[0]} alt="" />
                                )
                            }
                            {
                                data.imgs.length === 2 && (
                                    <div className="flex w-full gap-2">
                                        {data.imgs.map((img, index) => (
                                            <img key={index} className="w-1/2 max-h-[500px] object-cover rounded-lg" src={img} alt="" />
                                        ))}
                                    </div>
                                )
                            }
                            {
                                data.imgs.length > 2 && (
                                    <div className="flex justify-between w-full gap-4 items-center">
                                        <div className="w-full">
                                            <img className="w-full max-h-[500px] object-cover rounded-lg" src={data.imgs[0]} alt="" />
                                        </div>
                                        <div className="grid grid-cols-2 grid-rows-2 w-full gap-4">
                                            {data.imgs.slice(1, 4).map((img, index) => ( // Slicing to get only the next three images
                                                <img key={index} className="w-full h-[250px] object-cover rounded-lg" src={img} alt="" />
                                            ))}
                                            <div className="w-full h-[250px] rounded-lg relative" onClick={() => {
                                                setShowAllImages(true)
                                            }}>
                                                <span className="absolute w-full text-center text-white drop-shadow-lg top-[50%]">See all {data.imgs.length} pictures</span>
                                                <img className="w-full h-[250px] rounded-lg object-cover contrast-50 hover:contrast-[.1] transition-all cursor-pointer" src={data.imgs[4]} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                showAllImages && (
                                    <div className="absolute h-screen mt-[11.8rem] flex justify-center items-center p-10 bg-[#1d1c1cd8] w-full left-0">
                                        <FontAwesomeIcon className="text-white text-4xl absolute top-4 right-4 cursor-pointer" icon={faTimes} onClick={() => {
                                            setShowAllImages(false)
                                        }
                                        } />
                                        <Carousel
                                            showThumbs={false}
                                            transitionTime={500}
                                            swipeable
                                            emulateTouch
                                            renderIndicator={(onClickHandler, isSelected, index, label) => {
                                                (isSelected)
                                                const defStyle = {
                                                    marginLeft: 5,
                                                    marginRight: 5,
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                }
                                                const style = isSelected ? { ...defStyle } : { ...defStyle }
                                                if (isSelected) {
                                                    return (
                                                        <span
                                                            style={style}
                                                            onClick={onClickHandler}
                                                            onKeyDown={onClickHandler}
                                                            key={index}
                                                            role="button"
                                                            tabIndex={0}
                                                            aria-label={`${label} ${index + 1}`}
                                                        >
                                                            <i
                                                                className={`fa-solid fa-circle text-[#3A4161] text-[12px] !transform-y-10`}
                                                            ></i>
                                                        </span>
                                                    )
                                                } else {
                                                    return (
                                                        <span
                                                            style={style}
                                                            onClick={onClickHandler}
                                                            onKeyDown={onClickHandler}
                                                            key={index}
                                                            role="button"
                                                            tabIndex={0}
                                                            aria-label={`${label} ${index + 1}`}
                                                        >
                                                            <i
                                                                className={`fa-regular fa-circle text-[#3A4161] !text-[12px]`}
                                                            ></i>
                                                        </span>
                                                    )
                                                }
                                            }}
                                            className={`w-full`}
                                        >
                                            {data.imgs.map((img, index) => (
                                                <div className="flex justify-center" key={index}>
                                                    <img key={index} className="w-full max-h-[500px] object-cover rounded-lg" src={img} alt="" />
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>
                                )
                            }

                        </div>
                    ) : (
                        <Carousel
                            showArrows={false}
                            showStatus={false}
                            showThumbs={false}
                            transitionTime={500}
                            swipeable
                            emulateTouch
                            renderIndicator={(onClickHandler, isSelected, index, label) => {
                                (isSelected)
                                const defStyle = {
                                    marginLeft: 5,
                                    marginRight: 5,
                                    color: 'white',
                                    cursor: 'pointer',
                                }
                                const style = isSelected ? { ...defStyle } : { ...defStyle }
                                if (isSelected) {
                                    return (
                                        <span
                                            style={style}
                                            onClick={onClickHandler}
                                            onKeyDown={onClickHandler}
                                            key={index}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`${label} ${index + 1}`}
                                        >
                                            <i
                                                className={`fa-solid fa-circle text-[#3A4161] text-[12px] !transform-y-10`}
                                            ></i>
                                        </span>
                                    )
                                } else {
                                    return (
                                        <span
                                            style={style}
                                            onClick={onClickHandler}
                                            onKeyDown={onClickHandler}
                                            key={index}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`${label} ${index + 1}`}
                                        >
                                            <i
                                                className={`fa-regular fa-circle text-[#3A4161] !text-[12px]`}
                                            ></i>
                                        </span>
                                    )
                                }
                            }}
                            className={`w-full`}
                        >
                            {data.imgs.map((img, index) => (
                                <div className="flex justify-center" key={index}>
                                    <img key={index} className="w-full max-h-[500px] object-cover rounded-lg" src={img} alt="" />
                                </div>
                            ))}
                        </Carousel>
                    )
                }
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
                            <h2 className="text-black font-bold text-xl my-2">Collaborateurs</h2>
                            <div className="rounded-lg p-6 shadow-lg flex flex-wrap gap-4">
                                <div className="w-fit rounded-lg flex flex-col items-center border border-1 border-gray-200 p-6">
                                    <span className="bg-black px-10 py-8 rounded-full text-white font-bold text-2xl mb-2">A</span>
                                    <span className="text-black">Anthoni</span>
                                </div>
                                <div className="w-fit rounded-lg flex flex-col items-center border border-1 border-gray-200 p-6">
                                    <span className="bg-black px-10 py-8 rounded-full text-white font-bold text-2xl mb-2">R</span>
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
                            {/* <CustomMap /> */}
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
                </div>
            </section>
        </main>
    )
}