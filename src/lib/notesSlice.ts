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
      state.notes = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
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
  saveNoteRequest,
  saveNoteSuccess,
  saveNoteFailure,
} = notesSlice.actions;

export default notesSlice.reducer;
