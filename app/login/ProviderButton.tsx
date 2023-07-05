"use client";

import { Button } from "@/components/base";
import { signIn } from "next-auth/react";

export default function ProviderButton(provider: { id: string, name: string }) {
    return (
        <Button key={provider.name} buttonStyle="invert" className="w-full md:w-auto" onClick={() => {
            signIn(provider.id)
        }}>{provider.name}</Button>
    )
}