import React from "react";
import { PlaylistCard } from "../PlaylistCard/PlaylistCard";
import "./PlaylistCardDisplay.css";
function PlaylistsCardDisplay({ playlists }) {
  return (
    <div className="playlist-display">
      <div className="page-info">
        <h4>Playlists</h4>
        &#166;&#166;
        <p>
          {playlists.length} {playlists.length > 1 ? "Playlists" : "Playlist"}
        </p>
      </div>

      <div className="playlist">
        {playlists.map((playlist) => {
          return (
            <div key={playlist._id} className="playlist-card">
              <PlaylistCard playlist={playlist} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { PlaylistsCardDisplay };
