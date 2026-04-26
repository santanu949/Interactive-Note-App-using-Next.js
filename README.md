# 📝 Interactive Note App - Next.js & Redux Saga

An enterprise-grade, interactive note-taking application designed for high performance and seamless user experience. Built with the latest **Next.js 15**, **Redux Toolkit**, and **Redux Saga**, this app provides a robust platform for managing personal thoughts, snippets, and documentation with real-time autosave capabilities.

---

## 🚀 Key Features

- **Dynamic Note Management**: Create, edit, and delete notes instantly with a fluid UI.
- **Real-time Autosave**: Powered by **Redux Saga**, the app automatically persists your changes to local storage with a debounced side-effect system.
- **Modern Aesthetics**: A premium dark-mode interface featuring glassmorphism effects and smooth transitions.
- **Responsive Design**: Fully optimized for various screen sizes, from mobile to desktop.
- **Fast Performance**: Leverages Next.js 15 Turbopack for lightning-fast development and optimized production builds.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Side Effects**: [Redux Saga](https://redux-saga.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Typography**: [Inter Font](https://fonts.google.com/specimen/Inter)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 📦 Getting Started

Follow these simple steps to set up the project on your local machine:

### 1. Prerequisites
Ensure you have **Node.js (v18.0.0 or later)** installed.

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/santanu949/Interactive-Note-App-using-Next.js.git
cd Interactive-Note-App-using-Next.js
npm install
```

### 3. Execution
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the app.

---

## 🏗️ System Architecture

The project follows a modular architecture that separates concerns between UI, state, and side effects.

### 📁 Directory Structure
```text
src/
├── app/               # Next.js App Router (Layouts, Pages, Styles)
├── components/        # Reusable UI Components (Sidebar, Editor, etc.)
├── lib/               # Core logic (Redux Slices, Sagas, Store configuration)
├── types/             # TypeScript interfaces and types
```

### 🧩 Core Components
1. **Sidebar**: Handles note listing, navigation, and new note creation.
2. **NoteEditor**: A powerful workspace for editing note content with built-in debounced save triggers.
3. **Providers**: Wraps the application in the necessary Redux context.

---

## 🔄 Workflow & Data Flow

Understanding the logic of the application:

1. **User Input**: When a user types in the `NoteEditor`, the local component state is updated immediately.
2. **Action Dispatch**: After a 500ms debounce, the component dispatches an `updateNote` action to the Redux store.
3. **State Update**: The Redux slice updates the `notes` state, which instantly reflects in the `Sidebar`.
4. **Saga Side Effect**: Simultaneously, the `saveNoteRequest` action is intercepted by **Redux Saga**.
5. **Persistence**: The Saga handles the asynchronous task of saving the note to `localStorage` (or an external API in the future) and dispatches a `saveNoteSuccess` action upon completion.
6. **Rehydration**: On application load, the `Home` page dispatches a `setNotes` action to load data from `localStorage`.

---

## 👨‍💻 Author
**Santanu Samanta**
- [GitHub](https://github.com/santanu949)
- [LinkedIn](http://linkedin.com/in/santanusamanta4187)

---

*This project was improved and documented with ❤️ by Antigravity.*
