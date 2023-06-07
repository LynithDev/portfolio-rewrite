import { Animate, Button, Header } from "@/components/base";
import BlogPost from "@/types/BlogPost";
import { GenerateMetadataProps } from "@/types/GenerateMetadataProps";
import { convertTitleToURLFormat, getBlogData, getBlogs, updateBlogPost } from "@/utils/blog";
import { pluralize } from "@/utils/strings";
import { EyeIcon } from "@heroicons/react/24/solid";
import { ObjectId, WithId } from "mongodb";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import redis from "@/utils/redis";
import crypto from "crypto";

type PageParams = {
    year: string;
    month: string;
    day: string;
    title: string;
}

async function getPostData(timestamp: number, title: string) {
    const blogPost = await getBlogs({
        from: timestamp,
        to: timestamp + 86400000, // 24 hours from timestamp
        slug: convertTitleToURLFormat(title)
    });

    if (!blogPost || !blogPost[0]) return null;

    return {
        ...await getBlogData(blogPost[0])
    }
}

export async function generateMetadata(props: GenerateMetadataProps): Promise<Metadata> {
    const { year, month, day, title } = props.params;

    const timestamp = new Date(`${year}-${month}-${day}`).getTime();
    const post = await getPostData(timestamp, title);

    return {
        openGraph: {
            title: post?.title ?? "404",
            description: post?.content_short ?? "404",
            type: "article",
            images: [{
                url: post?.thumbnail ?? ""
            }],
        },
        authors: [
            {
                name: post?.author ?? "Unkown",
            }
        ],
        keywords: post?.tags ?? [],
        description: post?.content_short ?? "404",
    }
}

async function updateViewCount(blog: ObjectId, views?: number) {
    const ip = headers().get("x-forwarded-for");
    if (!ip) {
        return;
    }

    const cluster = await redis.getCluster();
    if (!cluster) await redis.connect();

    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
    const hash = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    
    const isNew = await cluster?.set([hash, blog.toString()].join(":"), 1, {
        NX: true,
        EX: 60 * 60 * 24 // 24 hours
    });
    if (!isNew) return;

    return updateBlogPost(blog, {
        views: (views ?? 0) + 1
    });
} 

export default async function BlogPage({ params }: { params: PageParams }) {
    const { year, month, day, title } = params;

    const timestamp = new Date(`${year}-${month}-${day}`).getTime();
    const post = await getPostData(timestamp, title);

    if (!post) {
        return redirect("/404");
    }

    const date = new Date(post.date);

    const prettyDate = date.toLocaleDateString([], {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    
    const prettyTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const views = post.views ?? 0;
    const viewText = pluralize(views, "view");

    updateViewCount(post._id, views);

    return (
        <section className="min-h-screen lg:mx-0 mx-md flex flex-col justify-start items-center mt-navbar">
            <Animate animations={["fade", "slide"]} className="max-w-content w-full flex flex-col mb-xl justify-start items-start gap-3">
                <Image src={post.thumbnail} alt={post.title} width={900} height={500} className="rounded-md aspect-video w-full" />
                <div className="flex md:flex-row flex-col md:justify-between justify-start w-full">
                    <p className="text-md opacity-80">By <b className="text-lg font-medium text-accent">{post.author}</b> on <b className="text-lg font-medium text-accent">{prettyDate}</b> at <b className="text-lg font-medium text-accent">{prettyTime}</b></p>
                    <p className="flex flex-row whitespace-nowrap opacity-70 md:text-base text-sm"><EyeIcon className="md:w-6 w-4 mr-xxs" /> {views} {viewText}</p>
                </div>
                {post.content}
                <div className="flex flex-row justify-center items-center w-full">
                    <Button link="/blog" className="mt-xxl">Back to blogs</Button>
                </div>
            </Animate>
        </section>
    )
}