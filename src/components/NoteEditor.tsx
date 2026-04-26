'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { updateNote, saveNoteRequest, togglePin, addTag, removeTag } from '../lib/notesSlice';
import { useState, useEffect } from 'react';
import { Pin, Bell, Search, User, ChevronDown, Calendar, Clock, Link as LinkIcon, Info } from 'lucide-react';
import { motion } from 'framer-motion';

import RichTextEditor from './RichTextEditor';
import { TagInput } from './TagInput';

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
      <div className="flex-1 flex flex-col bg-white">
        <TopBar />
        <div className="flex-1 flex items-center justify-center text-slate-400">
          <div className="text-center">
            <svg className="mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
            <p className="font-medium">Select a note to start editing</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 editor-fallback flex flex-col bg-white overflow-hidden min-w-0">
      <TopBar />
      
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Main Editor Canvas */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-10 scrollbar-hide border-r border-slate-100 min-w-0">
          <div className="max-w-3xl mx-auto">
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title"
              className="text-4xl font-bold bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-200 mb-8 w-full"
            />
            
            <RichTextEditor 
              content={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
        </div>

        {/* Right Properties Panel */}
        <div className="w-80 shrink-0 bg-white p-6 flex flex-col gap-8 overflow-y-auto border-l border-slate-50 hidden lg:flex">
          <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Properties</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600">
                <Calendar size={16} className="text-slate-400" />
                <div className="text-xs">
                  <span className="text-slate-400 block">Created</span>
                  <span className="font-medium">Oct 24, 2023</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Clock size={16} className="text-slate-400" />
                <div className="text-xs">
                  <span className="text-slate-400 block">Modified</span>
                  <span className="font-medium text-blue-600">Just now</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Info size={16} className="text-slate-400" />
                <div className="text-xs">
                  <span className="text-slate-400 block">Status</span>
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold mt-0.5 inline-block">IN PROGRESS</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Tags</h3>
            <TagInput 
              tags={note.tags}
              onAddTag={(tag) => dispatch(addTag({ id: note.id, tag }))}
              onRemoveTag={(tag) => dispatch(removeTag({ id: note.id, tag }))}
            />
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Linked Notes</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600 text-xs font-medium cursor-pointer hover:underline">
                <LinkIcon size={14} />
                Product Requirements
              </div>
              <div className="flex items-center gap-2 text-blue-600 text-xs font-medium cursor-pointer hover:underline">
                <LinkIcon size={14} />
                Architecture Research
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="h-14 border-b border-slate-100 bg-white flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-bold text-slate-900">Nexus Notes</h2>
      </div>

      <div className="flex-1 max-w-xl mx-4">
        <div className="relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search notes, folders..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 border border-slate-200 rounded text-[10px] text-slate-400 font-bold bg-white">
            ⌘K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Bell size={18} className="text-slate-400 cursor-pointer hover:text-slate-600" />
        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border border-slate-200">
           <User size={18} className="text-slate-400" />
        </div>
      </div>
    </div>
  );
}
