import React, { useState } from "react";
import "./VideoVertical.css";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { MdPlaylistAdd, MdWatchLater } from "react-icons/md";
import { CreatePlaylist } from "../../CreatePlaylistcard/CreatePlaylist";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideo,
  playlistModal,
  videoTobeAdded,
} from "../../../features/video/videoSlice";
import {
  addVideoToHistory,
  addVideoToLikes,
  addVideoToWatchLater,
  getAuth,
  removeVideoFromLikes,
  removeVideoFromWatchLater,
} from "../../../features/auth/authSlice";
function VideoVertical({ video }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const videoState = useSelector(getVideo);
  const dispatch = useDispatch();
  const authState = useSelector(getAuth);
  const { tokenVal } = authState;

  const addVideoToHistoryHandler = (video) => {
    dispatch(addVideoToHistory({ video, tokenVal }));
  };
  const addVideoToLikesHandler = async (video) => {
    dispatch(addVideoToLikes({ video, tokenVal }));
  };
  const removeVideoFromLikesHandler = async (id) => {
    dispatch(removeVideoFromLikes({ id, tokenVal }));
  };
  const removeVideoFromWatchLaterHandler = async (id) => {
    dispatch(removeVideoFromWatchLater({ id, tokenVal }));
  };
  const addVideoToWatchLaterHandler = async (video) => {
    dispatch(addVideoToWatchLater({ video, tokenVal }));
  };
  const { isUserLoggedIn } = authState;
  const navigate = useNavigate();
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
      <div className="video-vertical-card" key={video._id}>
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
          <div className="video-info">
            <h4
              onClick={() => {
                navigate(`/video/${video._id}`);
                addVideoToHistoryHandler(video);
              }}
            >
              {video.title}
            </h4>
            <p>
              {video.creator} || {video.views}K
            </p>
          </div>
          <div className="dropdown-action-button">
            <BsThreeDotsVertical
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="dropdown">
                <button
                  className="dropdown-button"
                  onClick={() => {
                    if (isUserLoggedIn) {
                      dispatch(playlistModal());
                      dispatch(videoTobeAdded(video));
                    } else navigate("/login");
                  }}
                >
                  Add to Playlist
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
                {isPresent(video._id, authState.likes) ? (
                  <button
                    className="dropdown-button"
                    onClick={() => removeVideoFromLikesHandler(video._id)}
                  >
                    Remove From Liked Videos
                    <AiFillLike className="dropdown-icon" />
                  </button>
                ) : (
                  <button
                    className="dropdown-button"
                    onClick={() => addVideoToLikesHandler(video)}
                  >
                    Add to Liked Videos
                    <AiFillLike className="dropdown-icon" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoVertical;
