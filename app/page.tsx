import { CodeBracketIcon, CodeBracketSquareIcon, HeartIcon } from "@heroicons/react/24/solid";
import { Button, Header, ButtonGroup, Animate } from "@components/base";
import { Projects } from "@components/pages/Projects";
import { metadata } from "@/utils/metadata";

const skills = [
    "React", "TypeScript", "NextJS", "Rust", "Java", "JavaScript", 
    "Figma", "BASH", "Linux", "TailwindCSS", "CSS",
    "NodeJS", "MongoDB", "SQL", "Git"
]

export default async function Page() {
    const socials = (await metadata()).socials;

    return (
        <>
            {/* Intro Section */}
            <section className="h-screen flex flex-col justify-center items-center">
                <Animate animations={["fade", "slide"]} className="max-w-content flex flex-col justify-evenly items-center text-center">
                    <Header size="lg" className="text-7xl">Lynith</Header>
                    <p className="max-w-xs text-xl mt-sm">A developer, designer and Linux enthusiast from Poland.</p>
                    <ButtonGroup className="mt-sm">
                        <Button link={`https://ko-fi.com/${socials.kofi}`}><HeartIcon className="flex-grow mr-xs w-5" /> Donate</Button>
                        <Button link="/#projects"><CodeBracketSquareIcon className="flex-grow mr-xs w-5" /> Projects</Button>
                    </ButtonGroup>
                </Animate>
            </section>

            {/* About Me */}
            <section className=" md:p-xl px-md py-xl flex flex-row justify-center items-center">
                <Animate duration={0.7} animations={["fade", "slideLeftFar"]} className="max-w-content w-full flex flex-col justify-start items-start text-left bg-secondary dark:bg-secondary-dark md:p-xl p-md rounded-xl">
                    <Header size="sm">About Me</Header>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum earum laborum deleniti facere eos illum obcaecati? Ullam ab hic facilis ut voluptatibus numquam, voluptate officiis, temporibus quae doloremque adipisci similique.</p>
                </Animate>
            </section>

            {/* Projects :D */}
            <span id="projects" className="block relative md:-top-20 invisible"></span>
            <section className=" md:p-xl p-md flex flex-row justify-center items-center bg-secondary dark:bg-secondary-dark ">
                <Animate animations={["fade", "slide"]} className="max-w-content w-full flex flex-col justify-start items-start text-left rounded-xl">
                    <Header size="sm">My Projects</Header>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum earum laborum deleniti facere eos illum obcaecati? Ullam ab hic facilis ut voluptatibus numquam, voluptate officiis, temporibus quae doloremque adipisci similique.</p>

                    {/* @ts-expect-error Async Server Component */}
                    <Projects className="mt-md" />
                </Animate>
            </section>

            {/* Skills */}
            <section className=" md:p-xl p-md flex flex-row justify-center items-center">
                <Animate duration={0.7} animations={["fade", "slideLeftFar"]} className="max-w-content w-full flex flex-col justify-start items-start text-left bg-secondary dark:bg-secondary-dark md:p-xl p-md rounded-xl">
                    <Header size="sm">My Skills</Header>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum earum laborum deleniti facere eos illum obcaecati? Ullam ab hic facilis ut voluptatibus numquam, voluptate officiis, temporibus quae doloremque adipisci similique.</p>

                    <div className="flex flex-row flex-wrap w-full mt-sm">
                        {skills.map((skill, i) => (
                            <p key={i} className="bg-accent px-sm py-xs m-xs text-sm text-white rounded-md">{skill}</p>
                        ))}
                    </div>
                </Animate>
            </section>
        </>
    )
}