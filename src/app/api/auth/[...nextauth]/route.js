import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from 'bcryptjs';

const authOption = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user._id,
            name: user.name,
            lastname: user.lastname,
            day: user.day,
            month: user.month,
            year: user.year,
            email: user.email,
          };
        } catch (error) {
          console.log("Error:", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Attach additional user info to the session
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.lastname = token.lastname;
      session.user.day = token.day;
      session.user.month = token.month;
      session.user.year = token.year;
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.lastname = user.lastname;
        token.day = user.day;
        token.month = user.month;
        token.year = user.year;
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
