"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Header, HyperLink } from "./base";
import TextInput from "./base/TextInput";

export default function ContactForm() {
    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [filled, setFilled] = useState(false);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        
        const content = {
            subject: encodeURIComponent(formData.subject.toString()),
            body: encodeURIComponent(formData.body.toString())
        }

        location.href = `mailto:me@lynith.dev?subject=${content.subject}&body=${content.body}`
    }

    const input = () => {
        setFilled(titleRef.current?.value != "" && bodyRef.current?.value != "")
    }

    // useEffect(() => {
    //     buttonRef.current?.disabled = !filled;
    // }, [filled])

    return (
        <form action="mailto:me@lynith.dev" className="w-full max-w-content flex flex-col gap-2" onSubmit={submit}>
            <span className="w-max"><Header size="md" underline>Contact Me</Header></span>
            <p>Want to send me a message? Send me an email at <HyperLink href="mailto:me@lynith.dev">me@lynith.dev</HyperLink> or use this contact form</p>

            <Header size="sm" className="mt-md">Title</Header>
            <TextInput ref={titleRef} autoComplete="off" placeholder="Title" name="subject" onChange={input}></TextInput>

            <Header size="sm" className="mt-md">Content</Header>
            <TextInput ref={bodyRef as any} placeholder="Content" multiline={true} name="body" onChange={input}></TextInput>

            <div className="flex flex-row justify-center mt-md">
                <Button disabled={!filled} type="submit">Send as Email</Button>
            </div>
        </form>
    )
}