import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const session = await getServerSession();

    if (session && session.user) {
        return redirect("/account");
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            
        </div>
    )
}