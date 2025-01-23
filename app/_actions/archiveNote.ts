"use server";
import connectDB from "@/config/database";
import { auth } from "../api/auth/[...nextauth]/auth";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const archiveNote = async (note_id: string, isArchived: boolean) => {
  await connectDB();
  const session = await auth();

  if (!session || !session.user?.id) {
    console.error("User must be logged in");
  }

  const currentTime = new Date();
  const currentTimeInNumber = currentTime.getTime();

  await User.updateOne(
    { _id: session?.user?.id, "notes._id": note_id },
    {
      $set: {
        "notes.$.isArchived": !isArchived,
        "notes.$.lastEdited": currentTimeInNumber,
      },
    }
  );

  if (isArchived) {
    revalidatePath("/", "layout");
    redirect("/");
  } else {
    revalidatePath("/archived", "layout");
    redirect("/archived");
  }
};
