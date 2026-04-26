# 📝 Nexus Notes - Professional Productivity Platform

An enterprise-grade, high-performance note-taking platform built with **Next.js 15**, **Tailwind CSS 4**, and **Redux Saga**. Nexus Notes (formerly Studio) is designed for professional workflows, featuring a 3-pane architecture, real-time intelligence, and a premium "Nexus" design system.

---

## 🚀 Key Features

- **Nexus Design System**: A high-density, premium light theme with a 3-pane workspace:
  - **Left Sidebar**: Navigation, profile management, and quick actions.
  - **Center Canvas**: Focused rich-text editing with wide margins and premium typography.
  - **Right Properties Panel**: Contextual metadata, status tracking, and linked notes.
- **Hybrid Rich Text Editor**: Markdown + WYSIWYG editor powered by **TipTap**, featuring task lists, syntax highlighting for code blocks, and real-time word count.
- **Nexus Command (⌘K)**: A categorized global command palette for quick navigation, search, and action execution.
- **Intelligent Organization**: Support for note pinning, hierarchical navigation (Folders), multi-tagging, and fuzzy search.
- **Real-time Persistence**: Debounced autosave powered by **Redux Saga**, ensuring no data loss with local storage persistence.
- **Fluid UX**: Micro-animations using **Framer Motion** and a responsive layout designed for deep work.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (Using modern `@import` and `@theme` engine)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Saga](https://redux-saga.js.org/)
- **Editor Engine**: [TipTap](https://tiptap.dev/)
- **Search**: [Fuse.js](https://fusejs.io/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📦 Getting Started

### 1. Prerequisites
Ensure you have **Node.js (v18.0.0 or later)** installed.

### 2. Installation
```bash
git clone https://github.com/santanu949/Interactive-Note-App-using-Next.js.git
cd Interactive-Note-App-using-Next.js
npm install
```

### 3. Execution
Start the development server with Turbopack:
```bash
npm run dev
```
Access the app at [http://localhost:3000](http://localhost:3000).

---

## 🏗️ System Architecture

Nexus Notes utilizes a **Decoupled Architecture** to ensure UI performance remains high during intensive editing.

### 📁 Directory Structure
```text
src/
├── app/               # Next.js App Router & Global Styles (Tailwind 4)
├── components/        # Nexus UI Components (Sidebar, NoteEditor, CommandPalette)
├── lib/               # Business Logic (Redux Slices, Sagas, Store)
├── types/             # Domain Types & Interfaces
```

### 🧩 Core Workflow
1. **Input**: User edits content in the `RichTextEditor`.
2. **Debounce**: Component state waits for a 500ms pause.
3. **Dispatch**: Action updates the Redux store.
4. **Saga**: Redux Saga intercepts the update to handle background persistence (Local Storage).
5. **Rehydration**: App state is automatically restored from the persistence layer on initialization.

---

## 👨‍💻 Author
**Santanu Samanta**
- [GitHub](https://github.com/santanu949)
- [LinkedIn](http://linkedin.com/in/santanusamanta4187)

---

*This platform was architected and built with ❤️ by Antigravity.*
