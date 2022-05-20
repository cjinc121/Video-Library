import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { VideoDisplayHorizontal } from "../../components/VideoDisplay/VideoDisplayHorizontal";
import { getAuth, getVideoInPlaylist } from "../../features/auth/authSlice";

function PlaylistPage() {
  const { playlistId } = useParams();
  const authState = useSelector(getAuth);
  const dispatch = useDispatch();
  const { tokenVal } = authState;
  const getVideoInPlaylistHandler = (id) => {
    dispatch(getVideoInPlaylist({ id, tokenVal }));
  };
  useEffect(() => {
    (async () => getVideoInPlaylistHandler(playlistId))();
  }, []);
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
