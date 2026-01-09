import { useState, KeyboardEvent } from 'react';
import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsDeleting(true);
      onDelete(note.id);
      // Reset deleting state after a short delay
      setTimeout(() => setIsDeleting(false), 500);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDelete();
    }
  };

  // Format date for display
  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Truncate content for preview (first 100 characters)
  const truncatedContent =
    note.content.length > 100
      ? `${note.content.substring(0, 100)}...`
      : note.content;

  return (
    <article
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all ${
        isDeleting ? 'opacity-50' : ''
      }`}
      aria-label={`Note: ${note.title}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800 flex-1">
          {note.title}
        </h3>
        <button
          onClick={handleDelete}
          onKeyDown={handleKeyDown}
          disabled={isDeleting}
          className="ml-4 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Delete note: ${note.title}`}
          aria-busy={isDeleting}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-3">{truncatedContent}</p>
      <time className="text-sm text-gray-500" dateTime={note.createdAt}>
        {formattedDate}
      </time>
    </article>
  );
}
