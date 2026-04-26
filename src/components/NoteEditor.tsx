'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { updateNote, saveNoteRequest } from '../lib/notesSlice';
import { useState, useEffect } from 'react';

export function NoteEditor() {
  const activeNoteId = useSelector((state: RootState) => state.notes.activeNoteId);
  const note = useSelector((state: RootState) => 
    state.notes.notes.find(n => n.id === activeNoteId)
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [activeNoteId, note?.id]);

  useEffect(() => {
    if (note && (title !== note.title || content !== note.content)) {
      const timer = setTimeout(() => {
        dispatch(updateNote({ id: note.id, title, content }));
        dispatch(saveNoteRequest({ ...note, title, content }));
      }, 500); // Debounced save
      return () => clearTimeout(timer);
    }
  }, [title, content]);

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-950 text-zinc-600">
        <div className="text-center">
          <svg className="mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
          <p>Select a note to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 p-8 overflow-hidden">
      <input 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="text-4xl font-bold bg-transparent border-none outline-none text-white mb-8 placeholder:text-zinc-800"
      />
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing..."
        className="flex-1 bg-transparent border-none outline-none text-zinc-300 resize-none text-lg leading-relaxed placeholder:text-zinc-800"
      />
    </div>
  );
}
