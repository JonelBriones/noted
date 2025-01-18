"use server";
import connectDB from "@/config/database";
import { auth } from "../api/auth/[...nextauth]/auth";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export const deleteNote = async (note_id: string) => {
  await connectDB();
  const session = await auth();

  if (!session || !session.user?.id) {
    console.error("User must be logged in");
  }

  await User.updateOne(
    { _id: session?.user?.id },
    { $pull: { notes: { _id: note_id } } }
  );

  revalidatePath("/", "layout");
};
