'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { setActiveNote, addNote } from '../lib/notesSlice';
import { Note } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, FileText, Command } from 'lucide-react';
import Fuse from 'fuse.js';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();

  const fuse = new Fuse(notes, {
    keys: ['title', 'content'],
    threshold: 0.3,
  });

  const results = query ? fuse.search(query).map(r => r.item) : notes.slice(0, 5);

  const togglePalette = useCallback(() => setIsOpen(prev => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePalette]);

  const handleSelectNote = (noteId: string) => {
    dispatch(setActiveNote(noteId));
    setIsOpen(false);
    setQuery('');
  };

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: query || 'Untitled Note',
      content: '',
      updatedAt: Date.now(),
      tags: [],
    };
    dispatch(addNote(newNote));
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center px-4 border-b border-zinc-800 bg-zinc-900/50">
              <Search className="w-5 h-5 text-zinc-500 mr-3" />
              <input 
                autoFocus
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes or type a command..."
                className="flex-1 py-4 bg-transparent border-none outline-none text-white text-lg placeholder:text-zinc-600"
              />
              <div className="flex items-center gap-1 px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
              {results.length > 0 ? (
                results.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => handleSelectNote(note.id)}
                    className="w-full flex items-center px-3 py-3 rounded-lg hover:bg-zinc-800 transition-colors text-left group"
                  >
                    <FileText className="w-5 h-5 text-zinc-500 mr-3 group-hover:text-blue-400" />
                    <div className="flex-1">
                      <h4 className="text-zinc-200 font-medium">{note.title || 'Untitled'}</h4>
                      <p className="text-xs text-zinc-500 truncate max-w-[400px]">
                        {note.content.replace(/<[^>]*>/g, '').substring(0, 60) || 'No content'}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-12 text-center text-zinc-500">
                  No results found for "{query}"
                </div>
              )}
            </div>

            <div className="p-2 border-t border-zinc-800 bg-zinc-900/50">
              <button 
                onClick={handleCreateNote}
                className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-zinc-800 text-sm text-zinc-400 transition-colors"
              >
                <Plus className="w-4 h-4 mr-3" />
                <span>Create new note "{query || 'Untitled'}"</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
