import React, { FC } from 'react'

const Button: FC<ButtonProps> = ({ title, classNames = '' }) => {
    return (
        <button className={`bg-main hover:bg-blue-700 text-white font-bold text-[13px] py-2 rounded px-5 ${classNames}`}>
            {title}
        </button>
    )
}

type ButtonProps = {
    title: string;
    classNames?: string;
}

export default Button