type Note = {
  _id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
};
type NoteList = {
  apiNotes: Note[];
};
export type { Note, NoteList };
