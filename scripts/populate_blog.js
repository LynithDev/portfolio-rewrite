const { MongoClient } = require('mongodb');

/** @type {import("../types/BlogPost.d.ts").BlogPost[]} */
const blogs = [
    {
        slug: "very-interesting-blog-post",
        title: "Very Interesting Blog Post",
        content_short: "This is a short description of the blog post",
        content: "# Hello World!\nThis is my blog post, where I can write [links](http://localhost:3000/) and do **lots** of *other* __things__!",
        thumbnail: "https://raw.githubusercontent.com/LynithDev/meta-data/master/assets/previews/gnome-app-hider.jpg",
        author: "Lynith",
        date: new Date().getTime(),
        views: 0,
        tags: ["Blog Post", "lol"]
    },
    {
        slug: "hello-world",
        title: "Hello World!",
        content_short: "This is a short description of the blog post",
        content: "# This is a second blog!\nThis is my blog post, where I can write [links](http://localhost:3000/) and do **lots** of *other* __things__!",
        thumbnail: "https://raw.githubusercontent.com/LynithDev/meta-data/master/assets/previews/gnome-app-hider.jpg",
        author: "Lynith",
        date: new Date().getTime(),
        views: 0,
        tags: ["Blog Post", "lol"]
    },
    {
        slug: "hello-world-3",
        title: "Hello World 3",
        content_short: "This is a short description of the blog post",
        content: "# Hello World!\nThis is my blog post, where I can write [links](http://localhost:3000/) and do **lots** of *other* __things__!",
        thumbnail: "https://raw.githubusercontent.com/LynithDev/meta-data/master/assets/previews/gnome-app-hider.jpg",
        author: "Lynith",
        date: new Date().getTime(),
        views: 0,
        tags: ["Blog Post", "lol"]
    }
]

const client = new MongoClient('mongodb://127.0.0.1:27017');

const run = async () => {
    await client.connect();
    const database = await client.db('lynith-www');
    await database.collection('blogs').insertMany(blogs);
}

run().then(() => {
    console.log(`Done populating ${blogs.length} blogs!`);
    process.exit(0);
});