import React, { FC } from 'react'

const Button: FC<ButtonProps> = ({ title, classNames = '', children, href }) => {

    const Tag = href ? 'a' : 'button'
    return (
        <Tag href={href} className={`bg-main hover:bg-blue-700 text-white font-bold text-[13px] py-2 rounded px-5 ${classNames}`}>
            {children ?? title}
        </Tag>
    )
}

type ButtonProps = {
    title: string;
    children?: JSX.Element;
    classNames?: string;
    href?: string;
} | {
    title?: string;
    children: JSX.Element;
    classNames?: string;
    href?: string;
}

export default Button