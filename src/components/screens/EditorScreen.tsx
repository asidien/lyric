import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSongStore } from '../../store/songStore';
import { MetronomeControl } from '../MetronomeControl';

export function EditorScreen() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const { addSong, updateSong, songs } = useSongStore();

  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [tempo, setTempo] = useState(120);

  useEffect(() => {
    if (songId !== 'new') {
      const song = songs.find(s => s.id === songId);
      if (song) {
        setTitle(song.title);
        setLyrics(song.lyrics);
        setTempo(song.tempo);
      }
    }
  }, [songId, songs]);

  const handleSave = () => {
    if (songId === 'new') {
      addSong({ title, lyrics, tempo, chords: [] });
    } else {
      updateSong(songId, { title, lyrics, tempo });
    }
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <input
          type="text"
          className="w-full text-xl bg-gray-800 text-white p-4 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="bg-gray-800 p-4 rounded">
          <MetronomeControl
            settings={{ tempo, timeSignature: { beats: 4, beatValue: 4 }, isPlaying: false }}
            onTempoChange={setTempo}
            onPlayToggle={() => {}}
          />
        </div>

        <textarea
          className="w-full h-96 bg-gray-800 text-white p-4 rounded resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter lyrics here..."
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-4 rounded hover:bg-blue-700 transition-colors"
          onClick={handleSave}
        >
          Save Song
        </button>
      </div>
    </div>
  );
}