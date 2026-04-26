'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { addNote, setActiveNote, deleteNote } from '../lib/notesSlice';
import { Note } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, FileText, Hash, Search, Pin } from 'lucide-react';
import { useState } from 'react';
import Fuse from 'fuse.js';

export function Sidebar() {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const activeNoteId = useSelector((state: RootState) => state.notes.activeNoteId);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const fuse = new Fuse(notes, {
    keys: ['title', 'content', 'tags'],
    threshold: 0.3,
  });

  const filteredNotes = searchQuery 
    ? fuse.search(searchQuery).map(r => r.item)
    : notes;

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
    <div className="w-80 h-full border-r border-zinc-800 bg-zinc-950 flex flex-col">
      <div className="p-6 border-b border-zinc-800 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Studio</h1>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateNote}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors border border-zinc-700 shadow-sm"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-zinc-400 transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-700 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide py-4 px-2">
        <AnimatePresence initial={false}>
          {filteredNotes.map((note) => (
            <motion.div 
              key={note.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              onClick={() => dispatch(setActiveNote(note.id))}
              className={`group relative p-3 rounded-xl cursor-pointer transition-all mb-1 ${
                activeNoteId === note.id 
                  ? 'bg-zinc-800 shadow-lg border border-zinc-700' 
                  : 'hover:bg-zinc-900 border border-transparent hover:border-zinc-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {note.isPinned ? (
                    <Pin className="w-4 h-4 text-blue-500 fill-current" />
                  ) : (
                    <FileText className={`w-4 h-4 transition-colors ${activeNoteId === note.id ? 'text-blue-400' : 'text-zinc-500'}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium truncate ${activeNoteId === note.id ? 'text-white' : 'text-zinc-400'}`}>
                    {note.title || 'Untitled'}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-zinc-600 font-mono">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {note.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[9px] text-zinc-700 bg-zinc-800/50 px-1 rounded border border-zinc-800">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <motion.button 
                initial={{ opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteNote(note.id));
                }}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-zinc-900">
        <div className="flex items-center justify-between text-[10px] text-zinc-600 px-2">
          <span>{notes.length} Notes</span>
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Cloud Synced
          </span>
        </div>
      </div>
    </div>
  );
}
