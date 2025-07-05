//
// YouTube Data API integration for videos section.
// Fetches Ayurveda/skincare videos dynamically.
// API key must be set in .env as REACT_APP_YOUTUBE_DATA_API_KEY.
// Docs: https://developers.google.com/youtube/v3/docs/search/list

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY || "YOUR_YOUTUBE_DATA_API_KEY";

// PUBLIC_INTERFACE
/**
 * Fetches a list of Ayurveda/skincare YouTube videos.
 * @param {string} query - The search query (default: Ayurveda healing).
 * @param {number} maxResults - Max videos to return.
 * @returns {Promise<Array>} Array of video objects (id, snippet).
 * If API key missing, returns an error property on the array object.
 */
export async function fetchAyurvedaVideos(query = "Ayurveda healing", maxResults = 6) {
  if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === "YOUR_YOUTUBE_DATA_API_KEY") {
    // Defensive: no API key, return user-facing error
    return Object.assign([], {
      error:
        "YouTube Data API key missing. Set REACT_APP_YOUTUBE_DATA_API_KEY in your .env and restart the app.",
      videos: [],
    });
  }

  try {
    const url =
      "https://www.googleapis.com/youtube/v3/search" +
      `?q=${encodeURIComponent(query)}&part=snippet&key=${YOUTUBE_API_KEY}&maxResults=${maxResults}&type=video&safeSearch=strict`;

    const response = await fetch(url);
    if (!response.ok) {
      // API or quota error
      return Object.assign([], {
        error: `YouTube API error: ${response.status} ${response.statusText}`,
      });
    }
    const data = await response.json();
    if (!data.items || !Array.isArray(data.items) || !data.items.length) {
      return Object.assign([], {
        error: "No YouTube videos found for this query.",
        videos: [],
      });
    }
    return data.items;
  } catch (e) {
    return Object.assign([], {
      error: "Error fetching YouTube videos. Please try again later.",
    });
  }
}
