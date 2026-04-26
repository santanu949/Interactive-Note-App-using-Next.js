export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
  tags: string[];
}

export interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  loading: boolean;
  error: string | null;
}
