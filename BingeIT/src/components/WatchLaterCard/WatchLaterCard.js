import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPlaylistAdd, MdWatchLater } from "react-icons/md";
import "./WatchLaterCard.css";
import { CreatePlaylist } from "../CreatePlaylistcard/CreatePlaylist";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideo,
  playlistModal,
  videoTobeAdded,
} from "../../features/video/videoSlice";
import {
  addVideoToHistory,
  getAuth,
  removeVideoFromWatchLater,
} from "../../features/auth/authSlice";
function WatchLaterCard({ video }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const videoState = useSelector(getVideo);
  const authState = useSelector(getAuth);
  const { tokenVal } = authState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeVideoFromWatchLaterHandler = async (id) => {
    dispatch(removeVideoFromWatchLater({ id, tokenVal }));
  };
  const addVideoToHistoryHandler = (video) => {
    dispatch(addVideoToHistory({ video, tokenVal }));
  };
  return (
    <>
      {videoState.playlistModal && (
        <div
          className="modal-page"
          onClick={() => {
            dispatch(playlistModal());
          }}
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
                  dispatch(playlistModal());
                  dispatch(videoTobeAdded(video));
                }}
              >
                Add Video To Playlist
                <MdPlaylistAdd className="dropdown-icon" />
              </button>
              <button
                className="dropdown-button"
                onClick={() => removeVideoFromWatchLaterHandler(video._id)}
              >
                Remove From watch Later
                <MdWatchLater className="dropdown-icon" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export { WatchLaterCard };
