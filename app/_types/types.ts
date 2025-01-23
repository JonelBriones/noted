type Note = {
  _id: string;
  title: string;
  tags: string[];
  content: string;
  lastEdited: number;
  isArchived: boolean;
};
type SettingsT = {
  colorTheme?: string;
  fontTheme?: string;
  password?: string;
};

export type { Note, SettingsT };
