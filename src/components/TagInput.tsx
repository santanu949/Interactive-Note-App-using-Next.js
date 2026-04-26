'use client';

import { useState } from 'react';
import { X, Plus, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export function TagInput({ tags, onAddTag, onRemoveTag }: TagInputProps) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      onAddTag(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimatePresence>
        {tags.map((tag) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 uppercase tracking-wider"
          >
            {tag}
            <button 
              onClick={() => onRemoveTag(tag)}
              className="hover:text-blue-800 transition-colors"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
      <div className="flex items-center gap-1 bg-slate-50 rounded-full px-2.5 py-1 border border-slate-100 focus-within:border-blue-200 focus-within:bg-white transition-all">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add..."
          className="bg-transparent border-none outline-none text-[10px] font-bold text-slate-500 w-16 placeholder:text-slate-300 uppercase tracking-widest"
        />
        <button onClick={handleAdd} className="text-slate-300 hover:text-blue-600">
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
