import React from "react";

// PUBLIC_INTERFACE
function YouTubeEmbed({ videoId, title }) {
  return (
    <div className="ayu-yt-embed">
      <iframe
        width="320"
        height="180"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <p>{title}</p>
    </div>
  );
}
export default YouTubeEmbed;
