"use client";

import { ComponentProps, useEffect, useState } from "react";
import Button from "./base/Button";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function ThemeSwitcher(props: ComponentProps<"button">) {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    useEffect(() => {
        if (window.localStorage.getItem('page-theme') !== null) {
            setTheme(window.localStorage.getItem('page-theme')!);
            return;
        }

        const isDarkSystemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(isDarkSystemTheme ? 'dark' : 'light');
    }, []);
    
    useEffect(() => {
        window.localStorage.setItem('page-theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const icon = theme === 'light' ? <MoonIcon className="w-5 pointer-events-none" /> : <SunIcon className="w-5 pointer-events-none" />;

    return (
        <Button {...props as any} onClick={toggleTheme} aria-label="Switch Theme" buttonStyle={"invert"} className={`px-sm ${props.className}`}>
            {icon}
        </Button>
    )
}