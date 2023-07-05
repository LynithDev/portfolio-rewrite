"use client";

import { HyperLink } from "@/components/base";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
    return (
        <p className="link cool-underline" onClick={() => signOut()}>Sign out</p>
    )
}