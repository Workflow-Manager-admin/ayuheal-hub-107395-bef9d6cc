import React, { useEffect, useState } from "react";
import YouTubeEmbed from "../components/YouTubeEmbed";
import Button from "../components/Button";
import { fetchAyurvedaVideos } from "../api/youtube";

// PUBLIC_INTERFACE
function Videos() {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("Ayurveda healing");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch videos on query change.
  useEffect(() => {
    setLoading(true);
    setError("");
    fetchAyurvedaVideos(query)
      .then(result => {
        if (Array.isArray(result)) {
          setVideos(result);
          setError(result.error || "");
        } else if (result && result.error) {
          setVideos([]);
          setError(result.error);
        } else {
          setVideos([]);
          setError("Unexpected response from YouTube API.");
        }
      })
      .catch(() => {
        setVideos([]);
        setError("Unable to load videos. Please check your internet connection.");
      })
      .finally(() => setLoading(false));
  }, [query]);

  const handleSearch = () => {
    setLoading(true);
    setError("");
    fetchAyurvedaVideos(query)
      .then(result => {
        if (Array.isArray(result)) {
          setVideos(result);
          setError(result.error || "");
        } else if (result && result.error) {
          setVideos([]);
          setError(result.error);
        } else {
          setVideos([]);
          setError("Unexpected response from YouTube API.");
        }
      })
      .catch(() => {
        setVideos([]);
        setError("Unable to load videos. Please check your internet connection.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="ayu-videos-page">
      <h1>Ayurvedic Videos</h1>
      <div className="ayu-video-search-bar">
        <input
          type="text"
          placeholder="Search Ayurveda videos"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button onClick={handleSearch} disabled={loading}>Search</Button>
      </div>
      {loading && <div>Loading videos...</div>}
      {error && (
        <div style={{ color: "#a6351f", marginBottom: "1em", fontSize: 14 }}>
          <strong>Error:</strong> {error.startsWith("YouTube Data API key missing")
            ? (
              <>
                {error}
                <div style={{ marginTop: 8, fontSize: 13 }}>
                  Obtain a <b>YouTube Data API</b> key from Google Cloud and add:<br />
                  <code>REACT_APP_YOUTUBE_DATA_API_KEY=YOUR_API_KEY</code><br />
                  to your <b>.env</b> file at the project root, then restart the app.
                </div>
              </>
            )
            : error}
        </div>
      )}
      <div className="ayu-video-grid">
        {(!loading && videos && videos.length > 0)
          ? (
            videos.map((v, idx) =>
              v && v.id && v.snippet ? (
                <YouTubeEmbed
                  key={v.id.videoId || v.id}
                  videoId={v.id.videoId || v.id}
                  title={v.snippet.title}
                />
              ) : null
            )
          )
          : (!loading && !error) && <p>No videos found for this search.</p>
        }
      </div>
    </div>
  );
}

export default Videos;
