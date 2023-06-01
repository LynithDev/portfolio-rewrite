import { getBlogData } from "@/utils/blog"

async function getData() {
    const data = await getBlogData();

    return {
        ...data
    }
}

export default async function BlogPage() {
    const data = await getData();

    console.log(data.title)
    
    return (
        <section className="h-screen flex flex-col justify-center items-center">
            {data.reactProcess}
        </section>
    )
}