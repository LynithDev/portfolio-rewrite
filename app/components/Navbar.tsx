"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, HTMLProps, ReactElement } from "react";
import Button from "./Button";
import { CurrencyDollarIcon, HeartIcon } from "@heroicons/react/24/solid";
import ThemeSwitcher from "./ThemeSwitcher";
import { Animate } from "./Animate";

const links: [string, string][] = [
    ["Home", "/"],
    ["Projects", "/projects"],
    ["Blog", "/blog"],
    ["Tools", "/tools"],
]

function NavbarLink({ href, name }: { href: string, name: string }) {
    const pathname = usePathname();
    const active = pathname === href ? "text-accent" : "";

    return (
        <Link href={href} className={`${active} text-base p-sm m-sm hover:text-accent/90`}>{name}</Link>
    )
}

export default function Navbar() {
    return (
        <nav className="w-full flex flex-row justify-center items-center fixed bg-primary dark:bg-primary-dark z-50">
            <Animate animations={["fade"]} className="max-w-content flex-1 flex flex-row py-md">
                <div className="flex flex-row flex-1 justify-end items-center">
                    {/* Placeholder element so the links can be centered lmfao */}
                </div>

                <div className="flex flex-row flex-1 justify-center items-center">
                    {links.map(([name, href], index) => (
                        <NavbarLink href={href} name={name} key={index} />
                    ))}
                </div>

                <div className="flex flex-row flex-1 justify-end items-center">
                    <ThemeSwitcher className="mr-xs" />
                    <Button link=""><CurrencyDollarIcon className="flex-grow mr-xs w-5" /> Commission</Button>
                </div>
            </Animate>
        </nav>
    )
}