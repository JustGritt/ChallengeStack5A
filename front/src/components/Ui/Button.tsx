"use client";

import React, { FC } from 'react'
import CircleLoader from "react-spinners/CircleLoader";


const Button: FC<ButtonProps> = ({ title, classNames = '', children, href, isLoading }) => {

    const Tag = href ? 'a' : 'button'
    return (
        <Tag href={href} className={`bg-main hover:bg-blue-700 text-white font-bold text-[13px] py-2 rounded px-5 ${classNames} justify-center flex`}>
            {isLoading ? (<CircleLoader
                color={"#EEF2FF"}
                loading={isLoading}
                size={19}
                aria-label="Loading Spinner"
                data-testid="loader"
            />) : (children ?? title)}
        </Tag>
    )
}

type ButtonProps = {
    title: string;
    children?: JSX.Element;
    classNames?: string;
    href?: string;
    isLoading?: boolean;
} | {
    title?: string;
    children: JSX.Element;
    classNames?: string;
    href?: string;
    isLoading?: boolean;
}

export default Button