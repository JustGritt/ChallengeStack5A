import Axios from "axios"
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth"
import api from "@/lib/services/api";
import { authApi } from "@/lib/services/auth";
import { store } from "@/lib/services/store";
import { ApiSuccessBase } from "@/types/ApiBase";
import { LoginResponse } from "@/types/Auth";


export enum Role {
    user = "user",
    admin = "admin",
}
interface IUser {
    /**
     * Role of user
     */
    role?: Role;
    /**
     * Field to check whether a user has a subscription
     */
    subscribed?: boolean;
}

declare module "next-auth" {
    interface User extends IUser { }
}

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            // The credentials are used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "johndoe@email.com",
                },
                password: { label: "Password", type: "password" },
            },
            // @ts-ignore
            authorize(credentials) {
                return credentials
            },
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/login",
    },

    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            // session.user.name = token.sub
            // session.user.image = "https://www.fillmurray.com/128/128"
            return session
        },
    },
};

export default NextAuth(authOptions);