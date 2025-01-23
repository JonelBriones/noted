"use server";
import { noteSchema } from "../_schemas/noteSchema";
import { revalidatePath } from "next/cache";
import connectDB from "@/config/database";
import User from "@/models/User";
import { auth } from "../api/auth/[...nextauth]/auth";

export const createNote = async (prevState: any, formData: FormData) => {
  await connectDB();
  const session = await auth();

  if (!session || !session.user?.id) {
    console.error("YOU MUST BE LOGGED IN");
  }

  const getFormData = {
    title: formData.get("title"),
    tags: formData.get("tags"),
    content: formData.get("content"),
  };

  const validated = noteSchema.safeParse(getFormData);
  console.log(validated);
  if (!validated.success) {
    return {
      ...prevState,
      data: { ...prevState.data, ...getFormData },
      zodErrors: Object.fromEntries(
        Object.entries(validated.error.flatten().fieldErrors).map(
          ([key, value]) => [key, value.join(",")]
        )
      ),
    };
  } else {
    console.log("VALIDATION:", validated);

    const tags = getFormData.tags
      ?.split(",")
      .map((tag: string) => tag.toLowerCase());

    const currentTime = new Date();
    const currentTimeInNumber = currentTime.getTime();

    const noteObject = {
      title: validated.data.title,
      tags: tags || [],
      content: getFormData.content,
      lastEdited: currentTimeInNumber,
      isArchived: false,
    };

    const user = await User.findById(session?.user?.id);
    user.notes.push(noteObject);

    try {
      await user.save();
      revalidatePath("/", "layout");
      return {
        successMsg: "Note added!",
      };
    } catch (error) {
      console.log(error);
      return {
        ...prevState,
        mongooseError: "Failed to save note.",
        data: JSON.parse(JSON.stringify(noteObject)),
      };
    }
  }
};
