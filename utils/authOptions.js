import connectDB from "../config/database";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  proviiders: [
    GoogleProvider({
      client,
    }),
  ],
};
