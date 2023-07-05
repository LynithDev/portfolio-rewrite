import { InferGetServerSidePropsType } from "next";
import { ComponentProps, ReactElement, cache, cloneElement } from "react";
import { Button } from "@components/base";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { GitHubIcon } from "@components/base/Icon";
import Animate from "../base/Animate";
import { Project, metadata } from "@/utils/metadata";

async function getData() {
    const data = await metadata();

    return {
        ...data
    }
}

function ProjectCard(props: Project) {
    let description = props.description ?? "";

    if (description.length > 80) {
        description = description.substring(0, 77) + "...";
    }

    if (description.length < 1) {
        description = "No description provided.";
    }

    return ( 
        <Animate animations={["fade", "slide"]} className="lg:w-1/3 relative md:w-[calc(50%-theme(margin.xs)*2)] w-full lg:max-w-project-max min-w bg-white dark:bg-primary-dark p-sm rounded-lg flex flex-col justify-between">
            <div className="absolute flex flex-row p-xs m-xs rounded-md bg-primary dark:bg-primary-dark">
                {props.icons}
            </div>
            <Image alt={`An image of ${props.name}`} src={props.thumbnail} width={300} height={180} className="rounded-md max-h-44 aspect-video object-cover w-full" />
            <div className="mb-xs mt-sm flex flex-col flex-1">
                <span className="ml-xs text-lg font-medium">{props.name}</span>
                <span className="ml-xs">{description}</span>
            </div>
            <div className="w-full flex flex-row justify-center items-center">
                {props.repository && (
                    <Button link={props.repository} buttonStyle="invert" className="w-full mr-xxs">
                        <GitHubIcon className="mr-xs" /> 
                        GitHub    
                    </Button>
                )}
                <Button link={props.link} buttonStyle="invert" className="w-full ml-xxs first:m-0">
                    <ArrowTopRightOnSquareIcon className="w-4 mr-xs stroke-2" />
                    Open
                </Button>
            </div>
        </Animate>
    )
}

export async function Projects(props: ComponentProps<"div">) {
    const data = await getData();

    const icons: {
        [key: string]: string
    } = data.icons;

    const iconCache: () => JSX.Element[] = cache(() => {
        return Object.keys(icons).map((key) => {
            return <Image key={key} src={icons[key]} alt={"Language Icon"} width={24} height={24} className="w-4 mr-xs last:mr-0 brightness-0 dark:invert" />
        })
    });

    const projects: Project[] = data.projects;

    return (
        <div {...props} className={`flex flex-row flex-wrap max-w-5xl justify-between w-full gap-2 ${props.className}`}>
            {projects.map((project, key) => {
                const svgIcons = iconCache().filter((icon) => project.icons.includes(icon.key as any));

                return (
                    <ProjectCard key={key} {...project} icons={svgIcons as any} />
                )})}
        </div>
    )
}