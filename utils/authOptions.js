import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
import Credentials from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import { boolean } from "zod";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        signin: { label: "Signin", type: "boolean" },
        login: { label: "Login", type: "boolean" },
      },
      async authorize(credentials) {
        await connectDB();

        //         const bcrypt = require("bcrypt");

        // // Hashing
        // const hashedPassword = await bcrypt.hash(password, 10);

        // // Verifying
        // const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

        const { email, password } = credentials || {};

        // when sign up, have a hashed password and retry password.

        // on login, it should have validations.
        if (!email || !password) {
          return null;
        }

        const userExist = await User.findOne({ email: email });
        if (credentials.signin == "true") {
          if (!userExist) {
            // create new user
            const username = email.slice(0, 20);
            await User.create({
              email: email,
              username: username,
              settings: {
                colorTheme: "Light Mode",
                fontTheme: "sans-serif",
                password: password,
              },
            });

            return {
              id: userExist._id.toString(),
              email: userExist.email,
            };
          }
        } else if (credentials.login == "true") {
          if (!userExist) {
            return null;
          }

          if (userExist) {
            return {
              id: userExist.id.toString(),
              email: userExist.email,
              image: userExist.image,
            };
          }
        }
        console.log("USER EMAIL TAKEN!");
        return null;
      },
      async session({ session }) {
        console.log("session 1");
        const user = await User.findOne({ email: session.user.email });
        session.user.id = user.id.toString();
        return session;
      },
    }),
  ],
  callbacks: {
    async signIn({ profile, account }) {
      if (account.provider === "google") {
        console.log("sign in with google");
        await connectDB();
        const userExist = await User.findOne({ email: profile.email });
        if (!userExist) {
          const username = profile.name.slice(0, 20);
          await User.create({
            email: profile.email,
            username: username,
            image: profile.image,
            settings: {
              colorTheme: "Light Mode",
              fontTheme: "sans-serif",
              password: "",
            },
          });
        }
      }
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session }) {
      console.log("session 2");
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      // session.user.image = user.image;
      return session;
    },
  },
};
