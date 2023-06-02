export interface BlogPost {
    slug: string;
    title: string;
    content: string;
    content_short: string;
    thumbnail: string;
    author: string;
    date: number;
    tags: string[];
    views?: number;
}

export default BlogPost;