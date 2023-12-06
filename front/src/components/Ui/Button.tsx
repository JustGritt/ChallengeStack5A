import React, { FC } from 'react'

const Button: FC<ButtonProps> = ({ title, classNames = '', children }) => {
    return (
        <button className={`bg-main hover:bg-blue-700 text-white font-bold text-[13px] py-2 rounded px-5 ${classNames}`}>
            {children ?? title}
        </button>
    )
}

type ButtonProps = {
    title: string;
    children?: JSX.Element;
    classNames?: string;
} | {
    title?: string;
    children: JSX.Element;
    classNames?: string;
}

export default Button