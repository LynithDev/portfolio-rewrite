import matter from "gray-matter";

import { Header, HyperLink } from "@components/base";
import React from "react";

import { unified } from "unified";
import rehypeParse from "rehype-parse";
import remarkRehype from 'remark-rehype'
import rehypeReact from 'rehype-react'
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypeFormat from "rehype-format";

import mongo from "@utils/mongo";
import { BlogPost } from "@/types/BlogPost";

const getAsReactNode = async (markdown: string) => {
    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeFormat)
        .use(rehypeStringify)
        .process(markdown);

    const reactProcess = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeReact, {
            createElement: React.createElement,
            Fragment: React.Fragment,
            components: {
                h1: (props: any) => <Header underline={false} animate={false} size="lg" className="mt-md" {...props} />,
                h2: (props: any) => <Header underline={false} size="md" className="mt-md" {...props} />,
                h3: (props: any) => <Header underline={false} size="sm" className="mt-md" {...props} />,
                a: HyperLink
            }
        })
    .process(processedContent.toString());

    return reactProcess.result;
}

type BlogFilters = {
    tags?: string[];
    title?: string;
    from?: number;
    to?: number;
    author?: string;
}

export const getBlogs = async (filters?: BlogFilters) => {
    if (!mongo.isConnected()) await mongo.connect();

    const blog = mongo.database().collection<BlogPost>("blogs");

    const { from, to, ...rest } = filters ?? {};

    const documents = await blog.find({
        $where: function() {
            const _from = (from ?? 0) <= this.date;
            const _to = (to ?? this.date) >= this.date;

            return _from && _to;
        },
        ...rest
    }).toArray();

    return documents;
}

export const getBlogData = async (blog: BlogPost) => {

    const { content, ...rest } = blog;

    const matterResult = matter(content);
    const reactNode = await getAsReactNode(matterResult.content);

    return {
        ...rest,
        content: reactNode,
    }
}
