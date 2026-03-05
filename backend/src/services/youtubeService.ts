import { YoutubeTranscript } from 'youtube-transcript';

export async function fetchYoutubeTranscript(url: string) {
  try {
    // Extract video ID from URL
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (!videoIdMatch) {
      throw new Error('Invalid YouTube URL');
    }

    const videoId = videoIdMatch[1];

    // Fetch transcript
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    // Join transcript entries into a single string
    const fullTranscript = transcript
      .map((entry: any) => entry.text)
      .join(' ');

    // Try to fetch video title and thumbnail from URL metadata
    // For now, we'll use a placeholder - in production, you might use a library to scrape metadata
    const title = `Video ${videoId}`;
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return {
      videoId,
      title,
      transcript: fullTranscript,
      thumbnail,
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch YouTube transcript: ${error.message}`);
  }
}
