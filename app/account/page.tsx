import { Animate, Header, HyperLink, Section } from "@/components/base";
import GravatarAvatar from "@/components/special/GravatarAvatar";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AccountPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return redirect("/login");
    }


    return (
        <Section fullView startAtHalfPage>
            <Header size="lg">Account</Header>
            <p>Manage your account here!</p>

            <section className="flex flex-col justify-center items-center gap-2">
                <Animate duration={0.7} animations={["fade", "slideLeftFar"]} className="max-w-content w-full flex flex-col justify-start items-start text-left bg-secondary dark:bg-secondary-dark md:p-lg p-md rounded-xl">
                    <div className="flex flex-col md:flex-row gap-4">
                        <GravatarAvatar includeWatermark={true} className="rounded-lg w-[128px] h-[128px] max-w-[128px]" email={session.user.email as string} alt={`${session.user.name as string}'s avatar`} width={256} height={256} />

                        <div className="flex flex-col justify-evenly">
                            <Header size="sm">{session.user.name}</Header>
                            
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum earum laborum deleniti facere eos illum obcaecati? Ullam ab hic facilis ut voluptatibus numquam, voluptate officiis, temporibus quae doloremque adipisci similique.</p>    
                        </div>
                    </div>

                </Animate>
                <SignOutButton />
            </section>
        </Section>
    )
}