import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useVideo } from "../../context/video-context";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPlaylistAdd, MdWatchLater } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { CreatePlaylist } from "../CreatePlaylistcard/CreatePlaylist";
function LikesCard({ video }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { videoState, videoDispatch } = useVideo();
  const navigate = useNavigate();
  const {
    authState,
    addVideoToWatchLaterHandler,
    removeVideoFromWatchLaterHandler,
    removeVideoFromLikesHandler,
    addVideoToHistoryHandler,
  } = useAuth();
  const isPresent = (id, array) => {
    if (array.find((item) => item._id === id)) return true;
    else return false;
  };
  return (
    <>
      {videoState.playlistModal && (
        <div
          className="modal-page"
          onClick={() =>
            videoDispatch({
              type: "PLAYLIST_MODAL",
            })
          }
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <CreatePlaylist />
          </div>
        </div>
      )}
      <div className="video-container" key={video._id}>
        <div
          onClick={() => {
            navigate(`/video/${video._id}`);
            addVideoToHistoryHandler(video);
          }}
          className="image-container"
        >
          <img src={video.thumbnail} alt="thumbnail" />
          <span>{video.duration}</span>
        </div>
        <div className="video-details">
          <h4
            onClick={() => {
              navigate(`/video/${video._id}`);
              addVideoToHistoryHandler(video);
            }}
          >
            {video.title}
          </h4>
          <p>
            {video.creator} &#9734; {video.views}
          </p>
        </div>
        <div className="dropdown-action-button">
          <BsThreeDotsVertical onClick={() => setShowDropdown(!showDropdown)} />
          {showDropdown && (
            <div className="dropdown">
              <button
                className="dropdown-button"
                onClick={() => {
                  videoDispatch({ type: "PLAYLIST_MODAL" });
                  videoDispatch({
                    type: "VIDEO_TO_BE_ADDED",
                    payload: video,
                  });
                }}
              >
                Add Video To Playlist
                <MdPlaylistAdd className="dropdown-icon" />
              </button>
              {isPresent(video._id, authState.watchlater) ? (
                <button
                  className="dropdown-button"
                  onClick={() => removeVideoFromWatchLaterHandler(video._id)}
                >
                  Remove From Watch Later
                  <MdWatchLater className="dropdown-icon" />
                </button>
              ) : (
                <button
                  className="dropdown-button"
                  onClick={() => addVideoToWatchLaterHandler(video)}
                >
                  Add to watch Later
                  <MdWatchLater className="dropdown-icon" />
                </button>
              )}
              <button
                className="dropdown-button"
                onClick={() => removeVideoFromLikesHandler(video._id)}
              >
                Remove from Liked Videos
                <AiFillLike className="dropdown-icon" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export { LikesCard };
