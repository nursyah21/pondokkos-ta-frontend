
import NextAuth from "next-auth";


import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/../lib/prisma";
import { compare } from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials ?? {}
                if (!email || !password) {
                    throw new Error("Missing username or password");
                }
                const user = await prisma.users.findUnique({
                    where: {
                        email,
                    },
                });
                
                
                if (!user || !(await compare(password, user.password))) {
                    throw new Error("Invalid username or password");
                }
                
                return user;
            },
        }),
    ],
    middleware: "/api/auth/middleware", 
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };