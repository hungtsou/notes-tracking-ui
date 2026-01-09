import type { Note } from '../types';
import NoteCard from './NoteCard';

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  // Sort notes by newest first (based on createdAt)
  const sortedNotes = [...notes].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (sortedNotes.length === 0) {
    return (
      <div className="text-center py-16 px-4" role="status" aria-live="polite">
        <svg
          className="mx-auto h-16 w-16 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No notes yet</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
          Get started by creating your first note using the form above. Your notes will be saved automatically.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label={`List of ${sortedNotes.length} note${sortedNotes.length !== 1 ? 's' : ''}`}
    >
      {sortedNotes.map((note) => (
        <div key={note.id} role="listitem">
          <NoteCard note={note} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
