import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { checkUserEmailPassword, oAuthToDbUser } from "@/database";




export default NextAuth({

  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@ejemplo.com' },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'contraseña' }
      },
      async authorize(credentials) {
        return await checkUserEmailPassword(credentials!.email, credentials!.password)
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
  //Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },


  //callbacks:
  jwt: {

  },

  session: {
    maxAge: 2592000, //30d
    strategy: 'jwt',
    updateAge: 86400, //1d
  },

  callbacks: {

    async jwt({ token, account, user }) {

      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            token.user = await oAuthToDbUser(user.email || '', user.name || '')
            break;

          case 'credentials':
            token.user = user
            break;
        }

      }

      return token;
    },
    async session({ session, token, user }) {

      // session.accessToken=token.accessToken;
      session.user = token.user!;
      console.log({ session })
      return { ...session, accessToken: token.accessToken };
    }

  }
})
//export default NextAuth(authOptions)