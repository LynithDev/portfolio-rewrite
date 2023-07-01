import { PropsWithChildren } from "react";

type PillProps = PropsWithChildren<{
    size?: "sm" | "md" | "lg";
}>

export default function Pill(props: PillProps) {
    const { children, size = "md" } = props;

    const sizeClass = {
        sm: "text-xs rounded-sm px-2.5 py-1",
        md: "text-sm rounded-md px-3 py-1.5",
        lg: "text-base rounded-lg px-4 py-2",
    }[size]

    return (
        <span className={`inline-flex items-center font-medium bg-accent/20 text-accent hover:opacity-80 transition-opacity hover:cursor-default ${sizeClass}`}>
            {children}
        </span>
    )
}