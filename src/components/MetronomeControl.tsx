import React from 'react';
import { MetronomeSettings } from '../types';
import { MinusIcon, PlusIcon, PlayIcon, StopIcon } from '@heroicons/react/24/outline';

interface Props {
  settings: MetronomeSettings;
  onTempoChange: (newTempo: number) => void;
  onPlayToggle: () => void;
}

export function MetronomeControl({ settings, onTempoChange, onPlayToggle }: Props) {
  return (
    <div className="flex items-center space-x-6">
      <button
        className={`flex items-center px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
          settings.isPlaying 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
        onClick={onPlayToggle}
      >
        {settings.isPlaying ? (
          <>
            <StopIcon className="w-5 h-5 mr-2" />
            Stop
          </>
        ) : (
          <>
            <PlayIcon className="w-5 h-5 mr-2" />
            Start
          </>
        )}
      </button>

      <div className="flex items-center space-x-4 bg-gray-700 rounded-lg p-2">
        <button
          className="p-2 text-white hover:bg-gray-600 rounded-lg transition-colors"
          onClick={() => onTempoChange(Math.max(40, settings.tempo - 5))}
        >
          <MinusIcon className="w-5 h-5" />
        </button>
        <span className="text-white text-xl font-semibold w-20 text-center">
          {settings.tempo} BPM
        </span>
        <button
          className="p-2 text-white hover:bg-gray-600 rounded-lg transition-colors"
          onClick={() => onTempoChange(Math.min(240, settings.tempo + 5))}
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}