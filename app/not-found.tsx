import { Animate, Header, HyperLink } from "./components/base";

export default function NotFoundPage() {
    const messages = [
        "You're lost",
        "Nothing to see here",
        "You're in the wrong place",
        "Oops",
        "Wrong page",
        "I don't seem to exist"
    ]

    const message = messages[Math.floor(Math.random() * messages.length)];

    return (
        <section className="h-screen flex flex-col justify-center items-center">
            <Animate animations={["fade", "slide"]} className="flex flex-col justify-center items-center">
                <Header size="md" animate={false} underline={false}>{message}</Header>
                <HyperLink href="/" className="mt-sm">Go back home</HyperLink>
            </Animate>
        </section>
    )
}