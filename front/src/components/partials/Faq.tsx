"use client"

import React, { FC, useState } from 'react';

const Faq: FC<FaqProps> = ({ classNames }) => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    return (
        <div className={`block w-full max-w-[90vw] lg:max-w-[70vw] p-6 bg-white border border-gray-200 rounded-lg shadow ${classNames?.container ?? ""}`}>
            <h1 className='mb-3 text-2xl font-semibold text-center text-black'>Frequently Asked Questions</h1>

            <h2>
                <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    onClick={() => setIsOpen1(!isOpen1)}>
                    <span>How does Odicylens works?</span>
                    <svg className={`w-3 h-3 ${isOpen1 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>

            {isOpen1 && (
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        We offer a simple and intuitive interface to help you find the best professionals for your projects. You can also manage your projects and your teams directly on our platform. We also offer an affiliate program for professionals to join our platform.
                    </p>
                </div>
            )}

            <h2>
                <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    onClick={() => setIsOpen2(!isOpen2)}>
                    <span>I want to book for a specific date</span>
                    <svg className={`w-3 h-3 ${isOpen2 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>

            {isOpen2 && (
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        You can book a professional for a specific date by contacting them directly on their profile page. You can also contact us directly to help you find the right professional for your project if needed, we will be happy to help you.
                    </p>
                </div>
            )}

            <h2>
                <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    onClick={() => setIsOpen3(!isOpen3)}>
                    <span>I want a refund</span>
                    <svg className={`w-3 h-3 ${isOpen3 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>

            {isOpen3 && (
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        Refunds are possible if the professional does not show up on the day of the shoot. You can also contact us directly to help you find the right professional for your project if needed, we will be happy to help you.
                    </p>
                </div>
            )}
        </div>
    );
};

type FaqProps = {
    classNames?: {
        container?: string;
    };
}

export default Faq;