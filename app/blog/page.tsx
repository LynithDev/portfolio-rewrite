import { Animate, Header } from "@/components/base";
import BlogPost from "@/types/BlogPost";
import { getBlogData, getBlogs } from "@/utils/blog"
import Image from "next/image";
import Link from "next/link";
import { BlogPostCard } from "./BlogPostCard";
import { Metadata } from "next";

async function getData() {
    const data = await getBlogs();

    return data ?? []
}

export default async function BlogPage() {
    const blogs = await getData();
    
    return (
        <section className="min-h-screen lg:mx-0 mx-md flex flex-col justify-start items-center">
            <Animate animations={["fade", "slide"]} className="max-w-content flex flex-col mt-half-page mb-xl justify-start items-start gap-3">
                <Header size="lg" animate={false} underline={false}>Blog</Header>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt reprehenderit voluptates, vero repellat corrupti perferendis? Voluptate, suscipit. Consequuntur minima corrupti, expedita facilis tempora ipsum quidem accusantium, harum, accusamus aspernatur inventore.</p>
                <div className="flex flex-row flex-wrap flex-1">
                    {blogs.map((blog, i) => {
                        const { _id, ...rest } = blog;
                        return (
                            <BlogPostCard key={i} {...rest} />
                        ) 
                    })}
                </div>
            </Animate>
        </section>
    )
}