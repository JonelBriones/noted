"use server";
import connectDB from "@/config/database";
import { auth } from "../api/auth/[...nextauth]/auth";
import { noteSchema } from "../_schemas/noteSchema";
import { revalidatePath } from "next/cache";
import User from "@/models/User";

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

  if (!getFormData.title) return;

  const validated = noteSchema.safeParse(getFormData);

  if (!validated.success) {
    return {
      ...getFormData,
      zodErrors: Object.fromEntries(
        Object.entries(validated.error.flatten().fieldErrors).map(
          ([key, value]) => [key, value.join(",")]
        )
      ),
    };
  } else {
    console.log(validated);
    const tags = getFormData.tags
      ?.split(",")
      .map((tag: string) => tag.toLowerCase());
    const noteObject = {
      title: validated.data.title,
      tags: tags || [],
      content: getFormData.content,
      lastEdited: new Date().toDateString(),
      isArchived: getFormData.isArchived == "true" ? true : false,
    };

    try {
      console.log("NOTE:", noteObject);

      await User.updateOne(
        { _id: session?.user?.id, "notes._id": note_id },
        {
          $set: {
            "notes.$": noteObject,
          },
        }
      );
      revalidatePath("/", "layout");
      return {
        successMsg: "Note added!",
      };
    } catch (error) {
      console.log(error);
      return {
        ...getFormData,
        mongooseError: "Failed to save note.",
        data: JSON.parse(JSON.stringify(noteObject)),
      };
    }
  }
};
