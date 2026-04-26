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
    <div className="flex flex-wrap items-center gap-2 mt-4">
      <AnimatePresence>
        {tags.map((tag) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1 px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-full border border-zinc-700"
          >
            <Hash className="w-3 h-3" />
            {tag}
            <button 
              onClick={() => onRemoveTag(tag)}
              className="hover:text-red-400 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
      <div className="flex items-center gap-1 bg-zinc-900/50 rounded-full px-2 py-1 border border-zinc-800 focus-within:border-zinc-600 transition-colors">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add tag..."
          className="bg-transparent border-none outline-none text-xs text-zinc-400 w-20 placeholder:text-zinc-700"
        />
        <button onClick={handleAdd} className="text-zinc-600 hover:text-zinc-300">
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
