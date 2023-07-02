"use client";

import { Button, Header, HyperLink } from "@/components/base";
import TextInput from "@/components/base/TextInput";
import Link from "next/link";
import { useRef, useState } from "react";

export default function EmbedInputs() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");
    const [color, setColor] = useState("");

    // late night coding be like
    const params = [
        title ? `title=${encodeURIComponent(title)}` : "",
        description ? `description=${encodeURIComponent(description)}` : "",
        url ? `url=${encodeURIComponent(url)}` : "",
        image ? `image=${encodeURIComponent(image)}` : "",
        color ? `color=${encodeURIComponent(color)}` : "",
    ].filter(v => v != "").join("&");

    const link = [
        location.origin,
        location.pathname,
        params.length > 0 ? `?${params}` : "",
    ].join("");

    return (
        <div className="flex flex-col w-full max-w-content gap-2">
            <Header size="lg">Embed Generator</Header>
            <p>Tool designed to generate links with custom embeds for <HyperLink href="https://discord.com/">Discord</HyperLink></p>

            <Header size="sm" className="mt-md">Title</Header>
            <TextInput placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}></TextInput>

            <Header size="sm" className="mt-md">Description</Header>
            <TextInput multiline placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></TextInput>

            <Header size="sm" className="mt-md">URL</Header>
            <TextInput placeholder="URL" value={url} onChange={e => setUrl(e.target.value)}></TextInput>

            <Header size="sm" className="mt-md">Image</Header>
            <TextInput placeholder="Image" value={image} onChange={e => setImage(e.target.value)}></TextInput>

            <Header size="sm" className="mt-md">Color</Header>
            <TextInput placeholder="Color" value={color} onChange={e => setColor(e.target.value)}></TextInput>

            <div className="w-full max-w-full mt-md ">
                <div className="overflow-auto">
                    <Link href={link}>{link}</Link>
                </div>
            </div>
        </div>
    )
}