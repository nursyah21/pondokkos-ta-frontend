// import { authOptions } from "@/app/lib/auth";
import NextAuth from "next-auth";

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
// import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/../lib/prisma";
import { compare } from "bcrypt";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        // Credentials({
        //     // credentials: {
        //     //     email: { label: "Email", type: "email" },
        //     //     password: { label: "Password", type: "password" }
        //     // },
        //     async authorize(credentials) {
        //         const user = await prisma.users.findUnique({
        //             where: { email: credentials.email },
        //         });

        //         if (!user) {
        //             throw new Error('No user found with that email address');
        //         }

        //         if (!user || !(await compare(password, user.password))) {
        //             throw new Error("Invalid username or password");
        //           }

        //         return { user };
        //     }
        // })
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
                // if user doesn't exist or password doesn't match
                if (!user || !(await compare(password, user.password))) {
                    throw new Error("Invalid username or password");
                }
                // console.log(new Date(), user)
                console.log(user)
                return user;
            },
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };