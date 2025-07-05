import React, { useEffect, useState } from "react";
import YouTubeEmbed from "../components/YouTubeEmbed";
import Button from "../components/Button";
import { fetchAyurvedaVideos } from "../api/youtube";

// PUBLIC_INTERFACE
function Videos() {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("Ayurveda healing");

  useEffect(() => {
    fetchAyurvedaVideos(query).then(setVideos);
  }, [query]);

  return (
    <div className="ayu-videos-page">
      <h1>Ayurvedic Videos</h1>
      <div className="ayu-video-search-bar">
        <input
          type="text"
          placeholder="Search Ayurveda videos"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Button onClick={() => fetchAyurvedaVideos(query).then(setVideos)}>Search</Button>
      </div>
      <div className="ayu-video-grid">
        {videos.map(v => (
          <YouTubeEmbed key={v.id.videoId || v.id} videoId={v.id.videoId || v.id} title={v.snippet.title} />
        ))}
        {!videos.length && <p>No videos loaded.</p>}
      </div>
    </div>
  );
}
export default Videos;
