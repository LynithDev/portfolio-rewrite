import { getBlogData, getBlogs } from "@/utils/blog"

async function getData() {
    const data = await getBlogs();

    console.log(data);

    return {
        ...data[0]
    }
}

export default async function BlogPage() {
    const data = await getBlogData(await getData());
    
    return (
        <section className="min-h-screen flex flex-col justify-center items-center">
            <div className="max-w-content md:mx-0 mx-md flex flex-col mt-half-page mb-xl justify-start items-start gap-3">
                {data.content}
            </div>
        </section>
    )
}