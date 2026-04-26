'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { setActiveNote, addNote } from '../lib/notesSlice';
import { Note } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, FileText, Command, Moon, Settings, FolderSearch, ChevronRight, CornerDownLeft } from 'lucide-react';
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

  const searchResults = query ? fuse.search(query).map(r => r.item) : [];

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

  const suggestions = [
    { icon: Plus, label: 'New Note', action: handleCreateNote, active: true },
    { icon: FolderSearch, label: 'Search across folders' },
    { icon: Moon, label: 'Toggle Dark Mode' },
    { icon: Settings, label: 'Open Settings' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4 bg-slate-900/20 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            className="w-full max-w-xl bg-white rounded-xl overflow-hidden shadow-[0_20px_70px_-10px_rgba(0,0,0,0.15)] border border-slate-200"
          >
            <div className="flex items-center px-5 border-b border-slate-100">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                autoFocus
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 py-5 bg-transparent border-none outline-none text-slate-900 text-lg placeholder:text-slate-300 font-medium"
              />
              <div className="px-1.5 py-0.5 border border-slate-200 rounded text-[10px] text-slate-400 font-bold bg-slate-50 uppercase">
                ESC
              </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto p-2 scrollbar-hide">
              {!query && (
                <div className="mb-4">
                  <h3 className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Suggestions</h3>
                  {suggestions.map((item) => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors text-left group ${
                        item.active ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <item.icon className={`w-4 h-4 mr-4 ${item.active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                      <span className="text-sm font-semibold">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="mb-2">
                <h3 className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {query ? 'Results' : 'Recent'}
                </h3>
                {(query ? searchResults : notes.slice(0, 3)).map((note) => (
                  <button
                    key={note.id}
                    onClick={() => handleSelectNote(note.id)}
                    className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors text-left group"
                  >
                    <FileText className="w-4 h-4 text-slate-400 mr-4 group-hover:text-slate-600" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 truncate">{note.title || 'Untitled'}</h4>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5 font-medium">
                        in Management / Planning
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-300 font-bold ml-4">
                      {new Date(note.updatedAt).toLocaleDateString() === new Date().toLocaleDateString() ? 'Today' : 'Yesterday'}
                    </span>
                  </button>
                ))}
                {query && searchResults.length === 0 && (
                  <div className="py-12 text-center text-slate-400 text-sm">
                    No results found for "{query}"
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest px-5">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><ChevronRight className="w-3 h-3" /> to navigate</span>
                <span className="flex items-center gap-1.5"><CornerDownLeft className="w-3 h-3" /> to select</span>
              </div>
              <span>Nexus Command</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
