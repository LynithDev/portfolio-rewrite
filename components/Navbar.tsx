"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, HTMLProps, ReactElement, useEffect, useRef } from "react";
import { CurrencyDollarIcon, Bars3BottomLeftIcon, UserIcon } from "@heroicons/react/24/solid";
import ThemeSwitcher from "./ThemeSwitcher";
import { Animate, Button } from "./base";
import { useMotionValueEvent, useScroll } from "framer-motion";

const links: [string, string][] = [
    ["Home", "/"],
    ["Projects", "/#projects"],
    ["Blog", "/blog"],
    ["Tools", "/tools"],
]

function NavbarLink({ href, name }: { href: string, name: string }) {
    const pathname = usePathname();

    let active = "";

    if (pathname === href) active = "text-accent";
    else if (pathname.startsWith(href) && pathname != "/" && href != "/") active = "text-accent";

    return (
        <Link href={href} scroll={false} className={`${active} md:text-base text-xl p-sm m-sm hover:text-accent/90`}>{name}</Link>
    )
}

function AccountButton({ className }: { className?: string }) {
    return (
        <Button link="/account" buttonStyle="invert" className={`px-sm ${className}`}>
            <UserIcon className="w-5 pointer-events-none" />
        </Button>
    )
}

export default function Navbar() {
    const navbarRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const clickListener = (event: MouseEvent) => {
        if (navbarRef.current?.contains(event.target as Node)) return;

        preventScroll(false);
        toggleOverlay(false)
        navbarRef.current?.classList.add("-translate-x-full");
        document.removeEventListener("click", clickListener);
    }

    const preventScroll = (state: boolean) => {
        const classname = "overflow-hidden";
        
        document.body.classList.toggle(classname, state)
    }

    const toggleOverlay = (force?: boolean) => {
        force ??= !navbarRef.current?.classList.contains("-translate-x-full");

        const overlay = overlayRef?.current;
        overlay?.classList.toggle("hidden", !force)
    }

    const showNavbar = () => {
        preventScroll(true);
        toggleOverlay(true);
        navbarRef.current?.classList.remove("-translate-x-full");
        document.addEventListener("click", clickListener);
    }

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        navbarRef.current?.classList.toggle("shadow-lg", latest > 40);
    });

    return (
        <>
            <div className="fixed left-2 top-2 md:hidden flex p-sm z-50 bg-primary dark:bg-primary-dark rounded-md" onClick={showNavbar}>
                <Bars3BottomLeftIcon className="w-5 h-5" />
            </div>
            <div ref={overlayRef} className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-50 z-40 hidden">
                
            </div>
            <nav ref={navbarRef} className="md:transition-shadow transition-transform md:max-h-navbar md:px-md lg:px-0 md:w-full md:h-auto h-full flex md:flex-row flex-col justify-center md:items-center fixed left-0 top-0 md:translate-x-0 -translate-x-full md:bg-primary md:dark:bg-primary-dark bg-secondary dark:bg-secondary-dark z-50">
                <Animate animations={["fade"]} className="max-w-content flex-1 flex md:flex-row flex-col md:px-0 px-md py-md">
                    <div className="flex flex-row flex-1 justify-end items-center">
                        {/* Placeholder element so the links can be centered lmfao */}
                    </div>

                    <div className="flex md:flex-row flex-col flex-1 md:justify-center md:items-center">
                        {links.map(([name, href], index) => (
                            <NavbarLink href={href} name={name} key={index} />
                        ))}
                    </div>

                    <div className="flex md:flex-row flex-col flex-1 justify-end md:items-center items-start">
                        <div className="flex flex-row">
                            <ThemeSwitcher className="mr-xs" />
                            <AccountButton className="mr-xs" />
                        </div>
                        <Button className="md:mt-0 mt-sm" link="https://ko-fi.com/lynith"><CurrencyDollarIcon className="flex-grow mr-xs w-5" /> Commission</Button>
                    </div>
                </Animate>
            </nav>
        </>
    )
}