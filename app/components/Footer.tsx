import Link from "next/link";
import Header from "./base/Header";
import { PropsWithChildren, cache } from "react";
import HyperLink from "./base/HyperLink";
import { metadata } from "../utils/metadata";

async function getData() {
    const data = await metadata();

    return {
        ...data
    }
}

function FooterColumn({ children, header }: PropsWithChildren<{ header: string }>) {
    return (
        <div className="flex flex-col justify-start items-start mb-md last:mb-0 md:mb-0">
            <Header size="sm">{header}</Header>
            <div className="flex flex-col justify-start items-start pl-xs">
                {children}
            </div>
        </div>
    )
}

export default async function Footer() {
    const data = (await getData()).socials

    const socials = [
        ["Ko-Fi", `https://ko-fi.com/${data.kofi}`],
        ["GitHub", `https://github.com/${data.github}`],
        ["Reddit", `https://reddit.com/u/${data.reddit}`],
        ["Discord", `https://discord.com/users/${data.discordId}`],
        ["Email", `mailto:${data.email}`]
    ]

    return (
        <footer className=" bg-secondary-dark p-xl text-white">
            <div className="max-w-content mx-auto flex flex-col md:flex-row md:justify-between justify-center md:items-start items-center">
                <FooterColumn header="Socials">
                    {socials.map((social, index) => (
                        <HyperLink href={social[1]} key={index}>{social[0]}</HyperLink>
                    ))}
                </FooterColumn>

                <FooterColumn header="Links">
                    <HyperLink href="/">Home</HyperLink>
                    <HyperLink href="/#projects">Projects</HyperLink>
                    <HyperLink href="/blog">Blog</HyperLink>
                </FooterColumn>
            </div>
        </footer>
    )
}