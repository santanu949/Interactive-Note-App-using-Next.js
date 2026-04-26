'use client';

import { Sidebar } from '../components/Sidebar';
import { NoteEditor } from '../components/NoteEditor';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotes } from '../lib/notesSlice';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initial load from local storage
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      dispatch(setNotes(JSON.parse(savedNotes)));
    }
  }, [dispatch]);

  return (
    <main className="flex h-screen w-full bg-black">
      <Sidebar />
      <NoteEditor />
    </main>
  );
}
