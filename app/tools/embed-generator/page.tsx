import { Section } from "@/components/base";
import { GenerateMetadataProps } from "@/types/GenerateMetadataProps";
import { Metadata } from "next"
import EmbedInputs from "./EmbedInputs";

export async function generateMetadata(props: GenerateMetadataProps): Promise<Metadata> {

    const getValue = (k: string) => {
        const key: string | string[] | undefined = props.searchParams[k];

        if (Array.isArray(key)) {
            return key.join(", ");
        }

        return key ?? "";
    }

    return {
        openGraph: {
            title: getValue("title"),
            description: getValue("description"),
            url: getValue("url"),
            images: [
                {
                    url: getValue("image"),
                }
            ],
        },
        themeColor: getValue("color"),
    }
}

export default function EmbedGenerator() {
    return (
        <Section fullView startAtHalfPage>
            <EmbedInputs />
        </Section>
    )
}