import { Metadata } from "next"
import Navbar from "./components/Navbar"
import "./globals.css";

import { Outfit } from "next/font/google";

export const metadata: Metadata = {
    title: "Lynith",
    description: "A software engineer, designer and Linux enthusiast",
    colorScheme: "dark light",
    themeColor: "#f05050",
    robots: "index, follow",
    openGraph: {
        type: "website",
        url: "https://lynith.dev/",
        siteName: "Lynith",
    },
    keywords: ["lynith", "lynithdev", "programming", "programmer", "commission", "developer", "coding", "coder", "javascript", "html", "css", "js", "nextjs", "rust", "java", "go", "kofi", "donate", "commission", "foss", "linux", "oss", "software", "github"]
}

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit"
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <script dangerouslySetInnerHTML={{
                    __html: `
                        {
                            const theme = window.localStorage.getItem('page-theme');
                            document.documentElement.classList.toggle('dark', theme === 'dark');
                        }  
                    `
                }}></script>
            </head>
            <body className={`${outfit.variable} bg-primary dark:bg-primary-dark m-0 p-0 font-sans text-black dark:text-white`}>
                <header>
                    <Navbar />
                </header>

                <main>
                    {children}
                </main>

                <footer>

                </footer>
            </body>
        </html>
    )
}