"use client";

import { ComponentProps, createElement } from "react"

type HeaderProps = {
    size?: 'sm' | 'md' | 'lg',
    animate?: boolean,
    underline?: boolean
}

export default function Header(props: ComponentProps<"h1"> & HeaderProps) {
    let { size, animate, underline, children, ...rest } = props;

    size ??= 'md';
    animate ??= true;
    underline ??= true;

    const level = {
        sm: 3,
        md: 2,
        lg: 1
    }[size];

    const levelClasses = {
        sm: "sm" + (underline ? " cool-underline" : ""),
        md: "md" + (underline ? " cool-underline" : ""),
        lg: "lg"
    }[size];

    return createElement(`h${level}`, { 
        ...rest,
        className: `header ${animate ? "animate" : ""} ${levelClasses} ${rest.className ?? ""}`
    }, children);
}