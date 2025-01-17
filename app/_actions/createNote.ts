"use server";
import Note from "@/models/Note";
import { noteSchema } from "../_schemas/noteSchema";
import { Note as NoteType } from "../_types/types";
import { revalidatePath } from "next/cache";
import connectDB from "@/config/database";

export const createNote = async (prevState: any, formData: FormData) => {
  await connectDB();
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
    const noteObject = {
      title: getFormData.title,
      tags: getFormData.tags || [],
      content: getFormData.content,
      lastEdited: new Date().toDateString(),
      isArchived: false,
    };
    const newNote = new Note(noteObject);
    await newNote.save();

    revalidatePath("/", "layout");

    return {
      successMsg: "Note added!",
      data: JSON.parse(JSON.stringify(newNote._id)),
    };
  }
};
