"use client";

import Link from "next/link";
import React, { ComponentProps, cloneElement, forwardRef } from "react";

export type ButtonProps = {
    link?: string,
    buttonStyle?: "primary" | "invert",
}

const Button = forwardRef(function Button({ link, buttonStyle, children, ...rest}: ButtonProps & ComponentProps<"button">, ref) {
    let styleClass;

    switch (buttonStyle) {
        default:
        case "primary":
            styleClass = "bg-accent text-white";
            break;
        case "invert":
            styleClass = "bg-secondary dark:bg-secondary-dark text-black dark:text-white";
            break;
    }

    const className = `btn ${styleClass} ${rest.className ?? ""}`;

    return link 
        ? <Link {...rest as typeof Link} className={className} href={link} ref={ref as any}>{children}</Link>
        : <button {...rest} className={className} ref={ref as any}>{children}</button>

})

export default Button;