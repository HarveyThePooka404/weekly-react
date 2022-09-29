import NextAuth from "next-auth";
import { NextApiHandler } from "next-auth/_next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../lib/prisma'


const authHandler: NextApiHandler = (req: any, res: any) => {
  return NextAuth(req, res, options);
};
export default authHandler;

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            username: credentials?.username,
            password: credentials?.password
          }
        })
  
        if (user) {
          return user
        } else {

          return null
        }
      }
    })
  ],
  session: {
   jwt: true
  },
  callbacks: {
    async session({ session, token }): Promise<any> {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.SECRET,
};
