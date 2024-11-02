import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as Tone from 'tone';
import { io } from 'socket.io-client';
import { useSongStore } from '../../store/songStore';
import { MetronomeControl } from '../MetronomeControl';
import { UsersIcon } from '@heroicons/react/24/outline';

export function PerformanceScreen() {
  const { songId } = useParams();
  const song = useSongStore((state) => state.songs.find(s => s.id === songId));
  const [connectedUsers, setConnectedUsers] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(song?.tempo ?? 120);
  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io('wss://your-websocket-server.com');

    socketRef.current.emit('join-room', songId);

    socketRef.current.on('user-count', (count: number) => {
      setConnectedUsers(count);
    });

    socketRef.current.on('scroll-update', (position: number) => {
      if (lyricsRef.current) {
        lyricsRef.current.scrollTop = position;
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [songId]);

  useEffect(() => {
    const synth = new Tone.Synth().toDestination();
    const metronome = new Tone.Loop(time => {
      synth.triggerAttackRelease("C5", "32n", time);
    }, "4n");

    if (isPlaying) {
      Tone.Transport.bpm.value = tempo;
      Tone.Transport.start();
      metronome.start(0);
    } else {
      Tone.Transport.stop();
      metronome.stop();
    }

    return () => {
      metronome.dispose();
      synth.dispose();
    };
  }, [isPlaying, tempo]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const position = e.currentTarget.scrollTop;
    setScrollPosition(position);
    socketRef.current?.emit('scroll', position);
  };

  if (!song) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-xl">Song not found</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">{song.title}</h2>
            <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
              <UsersIcon className="w-5 h-5 text-blue-400" />
              <span className="text-white">{connectedUsers} connected</span>
            </div>
          </div>
          
          <div 
            ref={lyricsRef}
            onScroll={handleScroll}
            className="bg-gray-800 rounded-xl p-6 h-[calc(100vh-300px)] overflow-y-auto text-xl text-white leading-relaxed whitespace-pre-line"
          >
            {song.lyrics}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border-t border-gray-700 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <MetronomeControl
            settings={{ tempo, timeSignature: { beats: 4, beatValue: 4 }, isPlaying }}
            onTempoChange={setTempo}
            onPlayToggle={() => setIsPlaying(!isPlaying)}
          />

          <button
            className={`px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
              autoScroll ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
            onClick={() => setAutoScroll(!autoScroll)}
          >
            Auto-scroll {autoScroll ? 'On' : 'Off'}
          </button>
        </div>
      </div>
    </div>
  );
}