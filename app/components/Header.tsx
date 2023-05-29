"use client";

import { ComponentProps, createElement } from "react"

type HeaderProps = {
    size?: 'sm' | 'md' | 'lg',
    animate?: boolean,
}

export default function Header(props: ComponentProps<"h1"> & HeaderProps) {
    let { size, animate, children, ...rest } = props;

    size ??= 'md';
    animate ??= true;

    const level = {
        sm: 3,
        md: 2,
        lg: 1
    }[size];

    const levelClasses = {
        sm: "sm underline",
        md: "md underline",
        lg: "lg"
    }[size];

    return createElement(`h${level}`, { 
        ...rest,
        className: `header ${animate ? "animate" : ""} ${levelClasses} ${rest.className ?? ""}`
    }, children);
}