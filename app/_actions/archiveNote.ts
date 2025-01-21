"use server";
import connectDB from "@/config/database";
import { auth } from "../api/auth/[...nextauth]/auth";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export const archiveNote = async (note_id: string, isArchived: boolean) => {
  await connectDB();
  const session = await auth();

  if (!session || !session.user?.id) {
    console.error("User must be logged in");
  }

  await User.updateOne(
    { _id: session?.user?.id, "notes._id": note_id },
    {
      $set: {
        "notes.$.isArchived": !isArchived,
      },
    }
  );
  // 1. filter by the user id and then find the note of note_id
  // 2. "$" to only update the note object that first matched note_id

  revalidatePath("/", "layout");
};
