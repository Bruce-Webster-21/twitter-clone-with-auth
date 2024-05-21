// https://www.npmjs.com/package/bcrypt
// Bcrypt turns a simple password into fixed-length characters called a hash.
// Before hashing a password, bcrypt applies a salt — a unique random string that makes the hash unpredictable.

import bcrypt from "bcrypt";

// NextAuth. js is designed to avoid the need to store passwords for user accounts.
// If you have an existing database of usernames and passwords,
// you can use a custom credentials provider to allow signing in with a username and password stored in an existing database.

import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

// https://www.prisma.io/docs/orm/overview/databases/database-drivers#:~:text=Adapters%20act%20as%20translators%20between,via%20the%20JavaScript%20database%20driver.

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/libs/prismadb";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid Credentials");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV == "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
