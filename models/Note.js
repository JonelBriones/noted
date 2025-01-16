import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    tags: [
      {
        type: String,
      },
    ],
    lastEdited: {
      type: String,
    },
    isArchived: {
      type: Boolean,
    },

    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Note = models.Note || model("Note", NoteSchema);
export default Note;
