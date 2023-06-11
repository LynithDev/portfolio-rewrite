import matter from "gray-matter";

import { Header, HyperLink } from "@components/base";
import React from "react";

import { unified } from "unified";

import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from 'remark-rehype'
import remarkEmoji from "remark-emoji";
import remarkBreaks from "remark-breaks";

import rehypeParse from "rehype-parse";
import rehypeReact from 'rehype-react'
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeFormat from "rehype-format";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

import mongo from "@utils/mongo";
import { BlogPost } from "@/types/BlogPost";
import { ObjectId, WithId } from "mongodb";
import "@/public/atom.min.css";

const getAsReactNode = async (markdown: string) => {
    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkEmoji)
        .use(remarkGfm)
        .use(remarkBreaks)
        .use(remarkRehype)
        .use(rehypeFormat)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(markdown);

    const reactProcess = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeReact, {
            createElement: React.createElement,
            Fragment: React.Fragment,
            components: {
                h1: (props: any) => (
                    <>
                    <Header underline={false} animate={false} size="lg" className="mt-md" {...props} />
                    <span className="w-full h-px bg-black dark:bg-white bg-opacity-20"></span>
                    </>
                ),
                h2: (props: any) => <Header underline={false} size="md" className="mt-md" {...props} />,
                h3: (props: any) => <Header underline={false} size="sm" className="mt-md" {...props} />,
                a: HyperLink,
                code: (props: HTMLDivElement | any) => {
                    const { className } = props;
                    let language;
                    if (className) {
                        language = className.split(" ").find((className: string) => className.startsWith("language-"))?.split("-")[1];
                        language = language ? language.toUpperCase() : "text";
                    }

                    return (
                        <>
                            {language ? <span>{language}</span> : <></>}
                            <code {...props} />
                        </>
                    )
                },
                table: (props: any) => (
                    <div className="max-w-content w-full overflow-x-auto">
                        <table {...props} />
                    </div>
                )
            }
        })
        .process(processedContent.toString());

    return reactProcess.result;
}

type BlogFilters = {
    tags?: string[];
    title?: string;
    slug?: string;
    from?: number;
    to?: number;
    author?: string;
}

export const convertTitleToURLFormat = (title: string): string => {
    return title.toLowerCase().replaceAll(" ", "-");
}

export const getBlogs = async (filters?: BlogFilters) => {
    if (!mongo.isConnected()) await mongo.connect();

    const blog = mongo.database().collection<BlogPost>("blogs");

    const { from, to, ...rest } = filters ?? {};

    const document = await blog.find({
        date: {
            $gte: from ?? 0,
            $lte: to ?? Date.now()
        },
        ...rest
    }).toArray();

    return document as WithId<BlogPost>[] | null;
}

export const getBlogData = async (blog: WithId<BlogPost>) => {

    const { content, ...rest } = blog;

    const matterResult = matter(content);
    const reactNode = await getAsReactNode(matterResult.content);

    return {
        matter: matterResult.data,
        ...rest,
        content: reactNode,
    }
}

export const updateBlogPost = (id: ObjectId, update: Partial<BlogPost>) => {
    if (!mongo.isConnected()) mongo.connect();

    const blog = mongo.database().collection<BlogPost>("blogs").findOneAndUpdate({
        _id: id
    }, {
        $set: update
    });
}
