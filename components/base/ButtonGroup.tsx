"use client";

import { Children, ComponentProps, PropsWithChildren, ReactElement, cloneElement, isValidElement } from "react"
import Button, { ButtonProps } from "./Button";

export default function ButtonGroup(props: ComponentProps<"div"> & PropsWithChildren<{ style?: "primary" | "invert" }>) {
    const { style, children, ...rest } = props;

    let styleClass: string;

    switch (style) {
        default:
        case "primary":
            styleClass = "bg-accent text-white";
            break;
        case "invert":
            styleClass = "bg-white text-accent";
            break;
    }

    const modified = Children.map(children, (child) => {
        if (isValidElement(child)) {
            return cloneElement(child as ReactElement, { 
                className: styleClass + " rounded-none first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg relative after:absolute after:z-10 after:-right-px after:top-1/2 after:-translate-y-1/2 after:bg-white after:h-1/2 after:rounded-xl after:w-0.5 last:after:content-none" + (child.props.className ?? "")
            })
        }
    });

    return (
        <div {...rest} className={`flex flex-row justify-center items-center w-full rounded-lg ${rest.className}`}>
            <div className="flex flex-row justify-center items-center rounded-lg">
                {modified}
            </div>
        </div>
    )
}