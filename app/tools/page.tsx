import { Animate, Header, HyperLink, Section } from "@/components/base";

export default async function ToolsPage() {
    const tools = [
        "embed-generator"
    ]

    return (
        <Section fullView startAtHalfPage>
            <Header size="lg" underline={false}>Tools</Header>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus optio at, dolorem veritatis sed earum aperiam, obcaecati accusamus impedit ipsa doloremque, praesentium ipsum amet! Repudiandae odit eaque sit voluptatibus similique!</p>
            {tools.map((tool, i) => {
                let displayName = tool;

                displayName = displayName.replaceAll("-", " ").replaceAll("_", " ");
                
                return (
                    <HyperLink key={i} href={`/tools/${tool}`} className="capitalize">{displayName}</HyperLink>
                )
            })}
        </Section>
    )
}