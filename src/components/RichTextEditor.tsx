'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { useEffect } from 'react';
import { Bold, Italic, List, ListTodo, Heading1, Heading2, Quote, Code } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const Toolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const buttons = [
    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: 'heading' },
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: 'bold' },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: 'italic' },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: 'bulletList' },
    { icon: ListTodo, action: () => editor.chain().focus().toggleTaskList().run(), active: 'taskList' },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: 'blockquote' },
    { icon: Code, action: () => editor.chain().focus().toggleCodeBlock().run(), active: 'codeBlock' },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-1 bg-white border border-slate-200 rounded-lg mb-8 w-fit mx-auto shadow-sm sticky top-0 z-10">
      {buttons.map((btn, i) => (
        <button
          key={i}
          onClick={btn.action}
          className={`p-2 rounded-md transition-colors ${editor.isActive(btn.active) ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
        >
          <btn.icon size={16} />
        </button>
      ))}
    </div>
  );
};

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
      CharacterCount,
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[500px] text-slate-700 text-lg leading-relaxed selection:bg-blue-100',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return <div className="animate-pulse bg-slate-50 h-[500px] rounded-lg" />;
  }

  return (
    <div className="flex flex-col h-full">
      <Toolbar editor={editor} />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <EditorContent editor={editor} />
      </div>
      <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        <span>{editor.storage.characterCount.words()} words</span>
        <span>{editor.storage.characterCount.characters()} characters</span>
      </div>
    </div>
  );
}
