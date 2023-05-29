import { CodeBracketIcon, CodeBracketSquareIcon, HeartIcon } from "@heroicons/react/24/solid";
import Button from "./components/Button";
import ButtonGroup from "./components/ButtonGroup";
import Header from "./components/Header";
import { Projects } from "./components/pages/Projects";
import { Animate } from "./components/Animate";

export default function Page() {
    return (
        <>
            {/* Intro Section */}
            <section className="w-screen h-screen flex flex-col justify-center items-center">
                <Animate animations={["fade", "slide"]} className="max-w-content flex flex-col justify-evenly items-center text-center">
                    <Header animate={false} size="lg" className="text-7xl">Lynith</Header>
                    <p className="max-w-xs text-xl mt-sm">A developer, designer and Linux enthusiast from Poland.</p>
                    <ButtonGroup className="mt-sm">
                        <Button><HeartIcon className="flex-grow mr-xs w-5" /> Donate</Button>
                        <Button><CodeBracketSquareIcon className="flex-grow mr-xs w-5" /> Projects</Button>
                    </ButtonGroup>
                </Animate>
            </section>

            {/* About Me */}
            <section className="w-screen md:p-xl px-md py-xl flex flex-row justify-center items-center">
                <Animate duration={0.7} animations={["fade", "slideLeftFar"]} className="max-w-content w-full flex flex-col justify-start items-start text-left bg-secondary dark:bg-secondary-dark md:p-xl p-md rounded-xl">
                    <Header size="sm">About Me</Header>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum earum laborum deleniti facere eos illum obcaecati? Ullam ab hic facilis ut voluptatibus numquam, voluptate officiis, temporibus quae doloremque adipisci similique.</p>
                </Animate>
            </section>

            {/* Projects :D */}
            <section className="w-screen md:p-xl p-md flex flex-row justify-center items-center bg-secondary dark:bg-secondary-dark ">
                <Animate animations={["fade", "slide"]} className="max-w-content w-full flex flex-col justify-start items-start text-left rounded-xl">
                    <Header size="sm">My Projects</Header>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum earum laborum deleniti facere eos illum obcaecati? Ullam ab hic facilis ut voluptatibus numquam, voluptate officiis, temporibus quae doloremque adipisci similique.</p>

                    {/* @ts-expect-error Async Server Component */}
                    <Projects className="mt-md" />
                </Animate>
            </section>
        </>
    )
}