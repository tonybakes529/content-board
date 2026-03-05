export type CardType = 'youtube' | 'text' | 'script';

export interface Card {
  id: number;
  board_id: number;
  type: CardType;
  title: string;
  content?: string;
  youtube_url?: string;
  youtube_video_id?: string;
  transcript?: string;
  thumbnail_url?: string;
  position_index: number;
  created_at: string;
}

export interface Board {
  id: number;
  name: string;
  thumbnail?: string;
  created_at: string;
}

export interface YouTubeTranscript {
  videoId: string;
  title: string;
  transcript: string;
  thumbnail: string;
}
