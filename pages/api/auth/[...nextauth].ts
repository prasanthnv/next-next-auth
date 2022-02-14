import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@website.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*********",
        },
        remember: {
          label: "remember",
          type: "checkbox",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const url = "http://localhost:3001/auth/login";
        type loginResponse = { user: { name: string; email: string } };

        const response = await axios.post(url, credentials);
        if (response) {
          const userData = response.data as loginResponse;
          console.log(userData.user);
          return userData.user;
        } else {
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
});
