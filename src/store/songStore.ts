import { create } from 'zustand';
import { Song } from '../types';

interface SongStore {
  songs: Song[];
  currentSong: Song | null;
  addSong: (song: Omit<Song, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSong: (id: string, updates: Partial<Song>) => void;
  setCurrentSong: (song: Song | null) => void;
}

export const useSongStore = create<SongStore>((set) => ({
  songs: [],
  currentSong: null,
  addSong: (songData) => set((state) => ({
    songs: [...state.songs, {
      ...songData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }],
  })),
  updateSong: (id, updates) => set((state) => ({
    songs: state.songs.map((song) =>
      song.id === id ? { ...song, ...updates, updatedAt: new Date() } : song
    ),
  })),
  setCurrentSong: (song) => set({ currentSong: song }),
}));