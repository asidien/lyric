import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { useSongStore } from '../../store/songStore';
import { SongCard } from '../SongCard';
import { Song } from '../../types';

type SortField = 'title' | 'updatedAt';
type SortDirection = 'asc' | 'desc';

export function HomeScreen() {
  const songs = useSongStore((state) => state.songs);
  const [sortField, setSortField] = useState<SortField>('updatedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedSongs = [...songs].sort((a, b) => {
    if (sortField === 'title') {
      return sortDirection === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else {
      return sortDirection === 'asc'
        ? a.updatedAt.getTime() - b.updatedAt.getTime()
        : b.updatedAt.getTime() - a.updatedAt.getTime();
    }
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ArrowUpIcon className="w-4 h-4" />
    ) : (
      <ArrowDownIcon className="w-4 h-4" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">My Songs</h1>
          <Link 
            to="/editor/new"
            className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create New Song
          </Link>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-700 text-gray-300 font-semibold">
            <button
              className="flex items-center space-x-2 hover:text-white transition-colors"
              onClick={() => toggleSort('title')}
            >
              <span>Title</span>
              <SortIcon field="title" />
            </button>
            <button
              className="flex items-center space-x-2 hover:text-white transition-colors"
              onClick={() => toggleSort('updatedAt')}
            >
              <span>Last Updated</span>
              <SortIcon field="updatedAt" />
            </button>
          </div>

          <div className="divide-y divide-gray-700">
            {sortedSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
            {songs.length === 0 && (
              <div className="p-8 text-center text-gray-400">
                No songs yet. Create your first song to get started!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}