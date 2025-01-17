import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().nonempty("Title is required."),
});

export type NoteSchema = z.infer<typeof noteSchema>;
