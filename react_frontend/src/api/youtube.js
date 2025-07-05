// YouTube Data API integration for videos section.
// Replace API_KEY with your YouTube Data API key.
// See: https://developers.google.com/youtube/v3/docs/search/list
const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY"; // TODO: Store securely in .env

// PUBLIC_INTERFACE
export async function fetchAyurvedaVideos(query = "Ayurveda healing") {
  try {
    // TODO: Replace with real fetch.
    // For now, use demo video data.
    return [
      {
        id: { videoId: "2Y2y3hHf7sI" },
        snippet: { title: "What is Ayurveda? An Intro", thumbnails: {} }
      },
      {
        id: { videoId: "J-yE5V5edmk" },
        snippet: { title: "Daily Ayurvedic Practices", thumbnails: {} }
      }
    ];
    /*
    const url = `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(query)}&part=snippet&key=${YOUTUBE_API_KEY}&maxResults=6&type=video`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
    */
  } catch (e) {
    // Fallback: No videos
    return [];
  }
}
