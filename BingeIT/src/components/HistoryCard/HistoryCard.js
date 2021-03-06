import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPlaylistAdd, MdWatchLater } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { CreatePlaylist } from "../CreatePlaylistcard/CreatePlaylist";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideo,
  playlistModal,
  videoTobeAdded,
} from "../../features/video/videoSlice";
import {
  addVideoToHistory,
  addVideoToWatchLater,
  getAuth,
  removeVideoFromHistory,
  removeVideoFromWatchLater,
} from "../../features/auth/authSlice";
function HistoryCard({ video }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const videoState = useSelector(getVideo);
  const authState = useSelector(getAuth);
  const { tokenVal } = authState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addVideoToWatchLaterHandler = (video) => {
    dispatch(addVideoToWatchLater({ video, tokenVal }));
  };
  const removeVideoFromHistoryHandler = (id) => {
    dispatch(removeVideoFromHistory({ id, tokenVal }));
  };
  const removeVideoFromWatchLaterHandler = (id) => {
    dispatch(removeVideoFromWatchLater({ id, tokenVal }));
  };
  const addVideoToHistoryHandler = (video) => {
    dispatch(addVideoToHistory({ video, tokenVal }));
  };

  const isPresent = (id, array) => {
    if (array.find((item) => item._id === id)) return true;
    else return false;
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
            {video.creator} &#166;&#166; {video.views}
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
                onClick={() => removeVideoFromHistoryHandler(video._id)}
              >
                Remove from History
                <AiOutlineHistory className="dropdown-icon" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export { HistoryCard };
