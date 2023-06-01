import { cache } from "react"

export type Project = {
    name: string,
    description: string,
    thumbnail: string,
    icons: string[],
    link?: string,
    repository?: string,
}

export type Metadata = {
    icons: {
        [key: string]: string
    },
    socials: {
        [key: string]: string
    },
    projects: Project[]
}

export const metadata: () => Promise<Metadata> = 
    cache(async () => {
        const response = await fetch(
            "https://raw.githubusercontent.com/LynithDev/meta-data/master/projects.json",
            {
                next: {
                    revalidate: 60 * 60
                }
            }
        );

        return await response.json() as Metadata;
    })