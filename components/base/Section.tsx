"use client";

import { ComponentProps, PropsWithChildren } from "react";
import Animate, { AnimationType } from "./Animate";

type SectionProps = ComponentProps<"div"> & {
    animations?: AnimationType[],
    startAtHalfPage?: boolean,
}

export default function Section(props: SectionProps) {
    let { children, className, animations, startAtHalfPage, ...rest } = props;

    animations ??= ["fade", "slide"];
    startAtHalfPage ??= true;

    return (
        <section className="min-h-screen lg:mx-0 mx-md flex flex-col justify-start items-center">
            <Animate animations={animations} className={`max-w-content min-w-content flex flex-col mb-xl justify-start items-start gap-3 ${startAtHalfPage ? "mt-half-page" : ""} ${className ?? ""}`}>
                {children}
            </Animate>
        </section>
    )
}