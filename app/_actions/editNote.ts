"use server";
import connectDB from "@/config/database";
import { auth } from "../api/auth/[...nextauth]/auth";
import { noteSchema } from "../_schemas/noteSchema";
import { revalidatePath } from "next/cache";
import User from "@/models/User";
import { Note } from "../_types/types";

interface NoteFormData {
  title: string;
  tags: string;
  content: string;
  isArchived: string;
}

interface ExtraFormData {
  zodError: {};
  mongooseError: "";
}

export const editNote = async (note_id: any, formData: FormData) => {
  await connectDB();
  const session = await auth();

  if (!session || !session.user?.id) {
    console.log("User not logged in");
  }

  const getFormData = {
    title: formData.get("title"),
    tags: formData.get("tags"),
    content: formData.get("content"),
    isArchived: formData.get("isArchived"),
  };

  const tags =
    typeof getFormData.tags === "string" &&
    getFormData.tags
      ?.split(",")
      .filter((tag) => tag != "")
      .map((tag: string) => tag.toLowerCase());

  const currentTime = new Date();
  const currentTimeInNumber = currentTime.getTime();

  const noteObject = {
    title: getFormData.title,
    tags: tags || [],
    content: getFormData.content,
    lastEdited: currentTimeInNumber,
    isArchived: getFormData.isArchived == "on" ? true : false,
  };

  console.log("IS ARCHIVED:", getFormData.tags);

  await User.updateOne(
    { _id: session?.user?.id, "notes._id": note_id },
    {
      $set: {
        "notes.$": noteObject,
      },
    }
  );
  revalidatePath("/", "page");
};
