export interface Song {
  id: string;
  title: string;
  lyrics: string;
  tempo: number;
  chords: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MetronomeSettings {
  tempo: number;
  timeSignature: {
    beats: number;
    beatValue: number;
  };
  isPlaying: boolean;
}