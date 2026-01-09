import { useState, useEffect } from 'react';
import type { Note } from './types';
import { initDatabase, getNotes, addNote, deleteNote } from './services/db';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize database and load notes on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await initDatabase();
        const loadedNotes = await getNotes();
        setNotes(loadedNotes);
      } catch (error) {
        console.error('Error initializing database:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle adding a new note
  const handleAddNote = async (noteData: { title: string; content: string }) => {
    try {
      const newNote = await addNote(noteData);
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note. Please try again.');
    }
  };

  // Handle deleting a note
  const handleDeleteNote = async (id: string) => {
    try {
      const success = await deleteNote(id);
      if (success) {
        setNotes(notes.filter((note) => note.id !== id));
      } else {
        alert('Failed to delete note. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center" role="status" aria-live="polite">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"
            aria-hidden="true"
          ></div>
          <p className="mt-4 text-gray-600" aria-label="Loading notes">
            Loading notes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Notes Tracking Application
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your notes with ease. Add, view, and delete notes that persist across sessions.
          </p>
        </header>

        <main id="main-content">
          <NoteForm onSubmit={handleAddNote} />
          <NoteList notes={notes} onDelete={handleDeleteNote} />
        </main>
      </div>
    </div>
  );
}

export default App;
