import { Button, Header, Section } from "@/components/base";
import TextInput from "@/components/base/TextInput";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LoginForm from "./LoginForm";

export default async function LoginPage(props: { searchParams?: { error?: string } }) {
    const session = await getServerSession(authOptions);

    if (session && session.user) {
        return redirect("/account");
    }

    const providers = await getProviders();

    const errors = {
        "Default": "An error occurred while logging in.",
        "Configuration": "This is a server error! Please contact me!",
        "AccessDenied": "You do not have access to this page.",
        "Verification": "This token has expired or has already been used.",
        "OAuthSignin": "Could not sign in with OAuth provider.",
        "OAuthCallback": "Could not retrieve OAuth callback.",
        "OAuthCreateAccount": "Could not create an account with this OAuth provider.",
        "EmailCreateAccount": "Could not create an account with this email.",
        "Callback": "Could not retrieve callback.",
        "OAuthAccountNotLinked": "Could not link OAuth account.",
        "EmailSignin": "Could not sign in with email.",
        "CredentialsSignin": "Could not sign in with credentials.",
        "CredentialsCreateAccount": "Could not create an account with credentials.",
        "SessionRequired": "Session required.",
    }

    return (
        <LoginForm providers={providers as any} error={(errors as any)[props.searchParams?.error ?? ""]} />
    )
}