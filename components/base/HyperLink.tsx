"use client";

import Link from "next/link";
import { ComponentProps } from "react";

export default function HyperLink(props: ComponentProps<"a">) {
    return (
        <Link href={props.href ?? ""} className={`link cool-underline ${props.className ?? ""}`}>{props.children}</Link>
    )
}