export interface CreateNoteType {
  userId: string;
  title: string;
  description: string;
}

export interface DeleteNoteType {
  userId: string;
  noteId: string;
}

export interface UpdateNoteType {
  userId: string;
  noteId: string;
  title?: string;
  description?: string;
  filed?: boolean;
}
