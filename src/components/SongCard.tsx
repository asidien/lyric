import React from 'react';
import { Link } from 'react-router-dom';
import { MusicalNoteIcon, PencilIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Song } from '../types';

interface Props {
  song: Song;
}

export function SongCard({ song }: Props) {
  return (
    <div className="p-4 hover:bg-gray-750 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl text-white font-semibold">{song.title}</h3>
          <p className="text-gray-400 text-sm">
            Last edited: {new Date(song.updatedAt).toLocaleDateString()} at{' '}
            {new Date(song.updatedAt).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/editor/${song.id}`}
            className="flex items-center px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all transform hover:scale-105"
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Edit
          </Link>
          <Link
            to={`/performance/${song.id}`}
            className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            <MusicalNoteIcon className="w-4 h-4 mr-2" />
            Perform
          </Link>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.origin + `/performance/${song.id}`)}
            className="flex items-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all transform hover:scale-105"
          >
            <UsersIcon className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}