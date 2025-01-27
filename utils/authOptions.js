import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
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
      return true;
    },
    async session({ session }) {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      return session;
    },
  },
};
