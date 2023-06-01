import matter from "gray-matter";

import { remark } from 'remark'
import rehypeParse from "rehype-parse";
import remarkRehype from 'remark-rehype'
import rehypeReact from 'rehype-react'
import React from "react";

import { Header, HyperLink } from "@components/base";
import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypeFormat from "rehype-format";
import rehypeDocument from "rehype-document";

export const getBlogData = async () => {
    const test = `---
title: Hello World
date: 2021-10-10
---
# Hello World
## Hello World
### Hello World
#### Hello World

a [link](https://google.com)

lol
- ok
1. test`;

    const matterResult = matter(test);

    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeFormat)
        .use(rehypeStringify)
        .process(matterResult.content);

    const reactProcess = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeReact, {
            createElement: React.createElement,
            Fragment: React.Fragment,
            components: {
                h1: (props: any) => <Header size="lg" {...props} />,
                h2: (props: any) => <Header size="md" {...props} />,
                h3: (props: any) => <Header size="sm" {...props} />,
                a: HyperLink
            }
        })
        .process(processedContent.toString());

    return {
        title: matterResult.data.title,
        date: matterResult.data.date,
        reactProcess: reactProcess.result
    }
}
