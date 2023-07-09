import mongo, { clientPromise } from "@/utils/mongo";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        })
    ],
    adapter: MongoDBAdapter(clientPromise) as Adapter<boolean>,
    debug: false,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }