import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
import Credentials from "next-auth/providers/credentials";
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
      },
      async authorize(credentials) {
        await connectDB();

        const { email, password } = credentials || {};

        console.log("crentials", credentials.email, credentials.password);
        const userExist = await User.findOne({ email: email });

        if (!userExist) {
          // const username = profile.name.slice(0, 20);
          await User.create({
            email: email,
            username: "TestUser",
            image: "https://i.redd.it/tw7b7dsezm081.png",
            settings: {
              colorTheme: "Light Mode",
              fontTheme: "sans-serif",
              password: password,
            },
          });
        }
        return userExist;
      },
      async session({ session }) {
        const user = await User.findOne({ email: session.user.email });
        session.user.id = user._id.toString();
        console.log("session:", session);
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
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      return session;
    },
  },
};
