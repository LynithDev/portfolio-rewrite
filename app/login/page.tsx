import { Button, Header, Section } from "@/components/base";
import TextInput from "@/components/base/TextInput";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import ProviderButton from "./ProviderButton";

export default async function LoginPage() {
    const session = await getServerSession();

    if (session && session.user) {
        return redirect("/account");
    }

    const providers = await getProviders();

    return (
        <Section fullView className="md:items-center md:justify-center">
            <div className="max-w-content w-full h-full flex flex-col justify-center items-start gap-2 mt-half-page md:mt-0">
                <Header size="lg">Login</Header>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus explicabo velit debitis, doloremque cum sequi error, nihil inventore quia ad quaerat. In obcaecati explicabo quae. Dolor enim iure accusantium blanditiis.</p>
                <div className="relative flex flex-col w-full md:flex-row gap-8 ">
                    <form action="" className="w-full flex flex-col gap-y-2">
                        <Header size="sm" className="mt-md">Username</Header>
                        <TextInput placeholder="Username" />

                        <Header size="sm" className="mt-md">Password</Header>
                        <TextInput placeholder="Password" type="password" />

                        <div className="flex flex-row w-full md:w-auto">
                            <Button type="submit" className="mt-md w-full md:w-auto">Login</Button>
                        </div>
                    </form>
                    <span className="flex mx-auto dark:bg-white bg-black bg-opacity-10 dark:bg-opacity-10 md:w-0.5 md:h-5/6 w-5/6 h-0.5"></span>
                    <div className="w-full flex flex-col gap-y-2">
                        <Header size="sm" className="md:mt-md">Or login with</Header>
                        {/* <div className="w-full flex flex-col gap-y-2"> */}
                            {Object.values(providers ?? []).map(provider => (
                                <ProviderButton key={provider.name} id={provider.id} name={provider.name} />
                            ))}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </Section>
    )
}