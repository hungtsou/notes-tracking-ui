import { Low } from 'lowdb';
import type { Database, Note } from '../types';

// Browser-compatible localStorage adapter for lowdb
class LocalStorage<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  async read(): Promise<T | null> {
    try {
      const item = localStorage.getItem(this.key);
      if (!item) {
        return null;
      }
      const parsed = JSON.parse(item);
      return parsed as T;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem(this.key);
      return null;
    }
  }

  async write(data: T): Promise<void> {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      throw error;
    }
  }
}

// Default data structure
const defaultData: Database = {
  notes: [],
};

// Create database adapter
const adapter = new LocalStorage<Database>('notes-db');
const db = new Low<Database>(adapter, defaultData);

// Initialize database
export async function initDatabase(): Promise<void> {
  // Try to load from localStorage
  const stored = await adapter.read();
  if (stored && stored.notes && Array.isArray(stored.notes)) {
    db.data = stored;
  } else {
    // Seed example data if database is empty
    const exampleNotes: Note[] = [
      {
        id: '1',
        title: 'Welcome to Notes Tracking',
        content: 'This is your first note. You can add, view, and delete notes using this application.',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Getting Started',
        content: 'Use the form above to create new notes. Each note has a title and content that you can manage easily.',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      },
      {
        id: '3',
        title: 'Tips & Tricks',
        content: 'Notes are automatically saved to a local JSON database. Your data persists across browser sessions.',
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
    ];
    
    db.data.notes = exampleNotes;
    await adapter.write(db.data);
  }
}

// Helper function to persist data
async function persist(): Promise<void> {
  await adapter.write(db.data);
}

// Get all notes
export async function getNotes(): Promise<Note[]> {
  const stored = await adapter.read();
  if (stored) {
    db.data = stored;
  }
  return db.data.notes;
}

// Add a new note
export async function addNote(note: Omit<Note, 'id' | 'createdAt'>): Promise<Note> {
  const stored = await adapter.read();
  if (stored) {
    db.data = stored;
  }
  
  const newNote: Note = {
    ...note,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };
  
  db.data.notes.push(newNote);
  await persist();
  
  return newNote;
}

// Delete a note by ID
export async function deleteNote(id: string): Promise<boolean> {
  const stored = await adapter.read();
  if (stored) {
    db.data = stored;
  }
  
  const initialLength = db.data.notes.length;
  db.data.notes = db.data.notes.filter((note) => note.id !== id);
  
  if (db.data.notes.length < initialLength) {
    await persist();
    return true;
  }
  
  return false;
}

export default db;
