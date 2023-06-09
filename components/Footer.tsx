import { PropsWithChildren, cache } from "react";
import { Header, HyperLink} from "@components/base";
import { metadata } from "@utils/metadata";
import Link from "next/link";

async function getData() {
    const data = await metadata();

    return {
        ...data
    }
}

function FooterColumn({ children, header }: PropsWithChildren<{ header: string }>) {
    return (
        <div className="flex flex-col justify-start items-start">
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
        <footer className="bg-secondary-dark">
            <div className="dark:bg-secondary-dark bg-secondary p-xl dark:text-white text-black">
                <div className="max-w-content mx-auto flex flex-row justify-between md:items-start">
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
            </div>
            
            {process.env.WEBSITE_SOURCE_CODE && (
                <div className="bg-secondary-dark p-md text-white">
                    <div className="max-w-content mx-auto flex flex-col md:flex-row justify-center items-center">
                        <p className="opacity-80">This website is open source. Check it out <HyperLink href={process.env.WEBSITE_SOURCE_CODE}>here</HyperLink></p>
                    </div>
                </div>
            )}
        </footer>
    )
}