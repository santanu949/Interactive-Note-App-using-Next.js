import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, NotesState } from '../types';

const initialState: NotesState = {
  notes: [],
  activeNoteId: null,
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
      state.notes.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
      state.activeNoteId = action.payload.id;
    },
    updateNote: (state, action: PayloadAction<Partial<Note> & { id: string }>) => {
      const index = state.notes.findIndex(n => n.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], ...action.payload, updatedAt: Date.now() };
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(n => n.id !== action.payload);
      if (state.activeNoteId === action.payload) {
        state.activeNoteId = state.notes[0]?.id || null;
      }
    },
    setActiveNote: (state, action: PayloadAction<string | null>) => {
      state.activeNoteId = action.payload;
    },
    togglePin: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(n => n.id === action.payload);
      if (note) {
        note.isPinned = !note.isPinned;
        // Sort notes: pinned first
        state.notes.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
      }
    },
    addTag: (state, action: PayloadAction<{ id: string, tag: string }>) => {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (note && !note.tags.includes(action.payload.tag)) {
        note.tags.push(action.payload.tag);
      }
    },
    removeTag: (state, action: PayloadAction<{ id: string, tag: string }>) => {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (note) {
        note.tags = note.tags.filter(t => t !== action.payload.tag);
      }
    },
    saveNoteRequest: (state, _action: PayloadAction<Note>) => {
      state.loading = true;
    },
    saveNoteSuccess: (state) => {
      state.loading = false;
    },
    saveNoteFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setNotes,
  addNote,
  updateNote,
  deleteNote,
  setActiveNote,
  togglePin,
  addTag,
  removeTag,
  saveNoteRequest,
  saveNoteSuccess,
  saveNoteFailure,
} = notesSlice.actions;

export default notesSlice.reducer;
