"use client";

import { Animate, Header } from "@/components/base";
import BlogPost from "@/types/BlogPost";
import { pluralize } from "@/utils/strings";
import { EyeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export function BlogPostCard(blog: BlogPost) {

    const date = new Date(blog.date);
    const url = `/blog/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${blog.slug}`;

    const prettyDate = date.toLocaleDateString();

    const views = blog.views ?? 0;
    const viewText = pluralize(views, "view")

    return (
        <Animate animations={["fade", "slide"]} className="w-full mb-sm last:mb-0">
            <Link href={url} className="w-full h-full flex md:flex-row flex-col md:justify-start justify-center items-center p-sm bg-secondary dark:bg-secondary-dark rounded-lg hover:opacity-60">
                <Image src={blog.thumbnail} alt={`Thumbnail for ${blog.title}`} width={400} height={220} className="rounded-md md:max-h-32 md:max-w-project-min aspect-video object-cover h-full w-full" />
                <div className="flex flex-col flex-1 w-full h-full justify-between md:ml-sm md:px-sm py-xxs">
                    <div className="flex flex-row w-full justify-between md:mt-0 mt-sm">
                        <small className="opacity-70">{blog.author} • {prettyDate}</small>
                        <p className="flex flex-row whitespace-nowrap opacity-70 md:text-base text-sm"><EyeIcon className="md:w-6 w-4 mr-xxs" /> {views} {viewText}</p>
                    </div>
                    
                    <Header size="sm" underline={false} >{blog.title}</Header>
                    <p>{blog.content_short}</p>

                    <div className="flex flex-row flex-shrink mt-sm">
                        {blog.tags.map((tag, i) => (
                            <span key={i} className="text-xs bg-accent rounded-sm ml-xxs first:ml-0 px-sm py-xxs text-white font-medium">{tag}</span>   
                        ))}
                    </div>
                </div>
            </Link>
        </Animate>
    )
}