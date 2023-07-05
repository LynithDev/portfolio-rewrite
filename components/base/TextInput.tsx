"use client";

import { ComponentProps, forwardRef } from "react";

type TextInputProps = Omit<ComponentProps<"input">, "type"> & {
    multiline?: boolean,
    type?: "text" | "password"
}

const TextInput = forwardRef(function TextInput(props: TextInputProps, ref) {

    const elProps = {
        ...props as any,
        ref,
        className: "resize-none rounded-lg px-4 py-2 dark:bg-secondary-dark bg-secondary text-black dark:text-white focus:transition-color-ring focus:text-accent focus:dark:text-accent ring-focus",
    }

    return props.multiline ? <textarea {...elProps} className={`${elProps.className} h-40`}></textarea> : <input type="text" {...elProps} />
});

export default TextInput;