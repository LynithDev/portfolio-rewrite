"use client";

import { ComponentProps, PropsWithChildren } from "react";
import Animate, { AnimationType } from "./Animate";

type SectionProps = ComponentProps<"div"> & {
    animations?: AnimationType[],
    startAtHalfPage?: boolean,
    fullView?: boolean
}

export default function Section(props: SectionProps) {
    let { children, className, fullView = false, animations = ["fade", "slide"], startAtHalfPage = false, ...rest } = props;

    return (
        <section className={`${fullView ? "min-h-screen" : ""} lg:mx-0 mx-md flex flex-col justify-start items-center ${className   }`} {...rest}>
            <Animate animations={animations} className={`max-w-content w-full flex flex-col justify-start items-start gap-3 ${startAtHalfPage ? "mt-half-page mb-xl" : "my-lg"} ${className ?? ""}`}>
                {children}
            </Animate>
        </section>
    )
}