import React, { FC, useState } from 'react';

const Faq: FC<FaqProps> = ({ classNames }) => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    return (
        <div className={`lock w-full p-6 bg-white border border-gray-200 rounded-lg shadow ${classNames?.container ?? ""}`}>
            <h1 className='mb-3 text-2xl font-semibold text-center'>FAQ</h1>

            <h2>
                <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    onClick={() => setIsOpen1(!isOpen1)}>
                    <span>Question 1</span>
                    <svg className={`w-3 h-3 ${isOpen1 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>

            {isOpen1 && (
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eius iure praesentium, laboriosam unde qui eos aspernatur laudantium sed perspiciatis?
                    </p>
                </div>
            )}

            <h2>
                <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    onClick={() => setIsOpen2(!isOpen2)}>
                    <span>Question 2</span>
                    <svg className={`w-3 h-3 ${isOpen2 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>

            {isOpen2 && (
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eius iure praesentium, laboriosam unde qui eos aspernatur laudantium sed perspiciatis?
                    </p>
                </div>
            )}

            <h2>
                <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    onClick={() => setIsOpen3(!isOpen3)}>
                    <span>Question 3</span>
                    <svg className={`w-3 h-3 ${isOpen3 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>

            {isOpen3 && (
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eius iure praesentium, laboriosam unde qui eos aspernatur laudantium sed perspiciatis?
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