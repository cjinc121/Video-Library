import React from "react";
import { useParams } from "react-router-dom";
import { VideoDisplayHorizontal } from "../../components/VideoDisplay/VideoDisplayHorizontal";
import { useAuth } from "../../context/auth-context";

function PlaylistPage() {
  const { playlistId } = useParams();
  const { authState } = useAuth();
  const playlist = authState.playlists.filter(
    (playlist) => playlist._id === playlistId
  );
  return (
    <div className="horizontal-container">
      {playlist && (
        <VideoDisplayHorizontal
          videos={playlist[0].videos}
          title={playlist[0].title}
        />
      )}
    </div>
  );
}

export default PlaylistPage;
