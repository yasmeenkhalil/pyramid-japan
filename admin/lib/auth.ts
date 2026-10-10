
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password.");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.trim(),
          },
        });

        if (!user) {
          throw new Error("Invalid email or password.");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid email or password.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  useSecureCookies: process.env.NODE_ENV === "production",

  callbacks: {
    async jwt({ token, user }) {
      const mutableToken = token as typeof token & {
        role?: string;
      };

      if (user) {
        mutableToken.role = (
          user as typeof user & { role?: string }
        ).role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        const mutableSessionUser = session.user as typeof session.user & {
          role?: string;
        };

        mutableSessionUser.role = (
          token as typeof token & { role?: string }
        ).role;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};