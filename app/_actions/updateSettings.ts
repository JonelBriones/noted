"use server";
import connectDB from "@/config/database";
import { auth } from "../api/auth/[...nextauth]/auth";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { SettingsT } from "../_types/types";

export const updateSettings = async (settings: SettingsT) => {
  await connectDB();
  const { colorTheme, fontTheme, password } = settings;
  const session = await auth();

  if (!session || !session.user?.id) {
    console.log("user not logged in.");
  }

  console.log("SETTINGS", settings);
  console.log("SETTINGS", colorTheme);

  await User.updateOne(
    { _id: session?.user?.id },
    {
      $set: {
        "settings.colorTheme": colorTheme,
        "settings.fontTheme": fontTheme,
      },
    }
  );

  revalidatePath("/", "page");

  return {
    successMsg: "Settings Updated!",
  };
};
