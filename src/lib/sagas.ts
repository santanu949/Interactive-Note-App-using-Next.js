import { takeLatest, put, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../types';
import { saveNoteRequest, saveNoteSuccess, saveNoteFailure } from './notesSlice';

function* handleSaveNote(action: PayloadAction<Note>) {
  try {
    // Simulate API call for autosave
    console.log('Autosaving note...', action.payload.title);
    yield delay(1000); 
    
    // In a real app, you'd call an API here
    // yield call(api.saveNote, action.payload);
    
    // Save to local storage for persistence in this demo
    const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const index = existingNotes.findIndex((n: Note) => n.id === action.payload.id);
    if (index !== -1) {
      existingNotes[index] = action.payload;
    } else {
      existingNotes.unshift(action.payload);
    }
    localStorage.setItem('notes', JSON.stringify(existingNotes));
    
    yield put(saveNoteSuccess());
  } catch (error: any) {
    yield put(saveNoteFailure(error.message));
  }
}

export function* rootSaga() {
  yield takeLatest(saveNoteRequest.type, handleSaveNote);
}
