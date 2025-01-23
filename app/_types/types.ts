type Note = {
  _id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: number;
  isArchived: boolean;
};

export type { Note };
