'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { addNote, setActiveNote, deleteNote } from '../lib/notesSlice';
import { Note } from '../types';
import { useEffect } from 'react';

export function Sidebar() {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const activeNoteId = useSelector((state: RootState) => state.notes.activeNoteId);
  const dispatch = useDispatch();

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Untitled Note',
      content: '',
      updatedAt: Date.now(),
      tags: [],
    };
    dispatch(addNote(newNote));
  };

  return (
    <div className="w-64 h-full border-r border-zinc-800 bg-zinc-950 flex flex-col">
      <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Notes</h1>
        <button 
          onClick={handleCreateNote}
          className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {notes.map((note) => (
          <div 
            key={note.id}
            onClick={() => dispatch(setActiveNote(note.id))}
            className={`p-4 cursor-pointer border-b border-zinc-900 group relative transition-colors ${activeNoteId === note.id ? 'bg-zinc-900' : 'hover:bg-zinc-900/50'}`}
          >
            <h3 className="font-semibold text-zinc-200 truncate">{note.title || 'Untitled'}</h3>
            <p className="text-sm text-zinc-500 truncate">{note.content || 'No content'}</p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteNote(note.id));
              }}
              className="absolute right-2 top-4 opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-500 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
