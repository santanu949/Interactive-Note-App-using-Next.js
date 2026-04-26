'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { addNote, setActiveNote, deleteNote } from '../lib/notesSlice';
import { Note } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, FileText, Hash, Search, Pin, Star, Folder, Archive, Settings, Bell } from 'lucide-react';
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
    <div className="w-72 sidebar-fallback h-full border-r border-slate-200 bg-white flex flex-col font-sans overflow-hidden">
      {/* Profile Section */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0">
          N
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-slate-900 truncate">Personal Space</h2>
          <p className="text-[10px] text-slate-500 font-medium">Enterprise Plan</p>
        </div>
      </div>

      {/* Primary Action */}
      <div className="px-4 py-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateNote}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-semibold shadow-sm transition-colors"
        >
          <Plus size={16} />
          New Note
        </motion.button>
      </div>

      {/* Main Navigation */}
      <nav className="mt-4 px-3 space-y-0.5">
        {[
          { icon: FileText, label: 'All Notes', active: true },
          { icon: Star, label: 'Favorites' },
          { icon: Folder, label: 'Folders' },
          { icon: Hash, label: 'Tags' },
          { icon: Archive, label: 'Archive' },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              item.active ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <item.icon size={16} className="shrink-0" />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Recent Notes Header */}
      <div className="mt-8 px-6 mb-2">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recent</h3>
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
              className={`group relative p-2 px-3 rounded-lg cursor-pointer transition-all mb-0.5 ${
                activeNoteId === note.id 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText size={16} className={`shrink-0 ${activeNoteId === note.id ? 'text-blue-600' : 'text-slate-400'}`} />
                <h3 className="text-sm font-medium truncate flex-1">
                  {note.title || 'Untitled'}
                </h3>
              </div>

              <motion.button 
                initial={{ opacity: 0 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 rounded-md"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteNote(note.id));
                }}
              >
                <Trash2 size={14} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
          <Settings size={16} />
          <span className="text-sm font-medium">Settings</span>
        </div>
      </div>
    </div>
  );
}
