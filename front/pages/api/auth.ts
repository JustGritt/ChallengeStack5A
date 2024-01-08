import Axios from "axios"
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"

const api = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const authOptions = {
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
            async authorize(credentials, req) {
                const { data, status } = await api.post("/login", credentials)
                if (status === 200) {
                    return data
                } else {
                    return null
                }
            }
        }),
    ],
};

export default NextAuth(authOptions);