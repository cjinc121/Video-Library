import React, { useState } from "react";
import "./VideoHorizontal.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgPlayListRemove } from "react-icons/cg";
import { MdWatchLater } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addVideoToHistory,
  addVideoToLikes,
  addVideoToWatchLater,
  deleteVideoFromPlaylist,
  getAuth,
  removeVideoFromWatchLater,
} from "../../../features/auth/authSlice";
function VideoHorizontal({ video }) {
  const { playlistId } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const authState = useSelector(getAuth);
  const { tokenVal } = authState;
  const dispatch = useDispatch();
  const addVideoToLikesHandler = (video) => {
    dispatch(addVideoToLikes({ video, tokenVal }));
  };
  const addVideoToHistoryHandler = (video) => {
    dispatch(addVideoToHistory({ video, tokenVal }));
  };
  const removeVideoFromWatchLaterHandler = async (id) => {
    dispatch(removeVideoFromWatchLater({ id, tokenVal }));
  };
  const addVideoToWatchLaterHandler = async (video) => {
    dispatch(addVideoToWatchLater({ video, tokenVal }));
  };
  const deleteVideoFromPlaylistHandler = async (id, videoId) => {
    dispatch(deleteVideoFromPlaylist({ id, videoId, tokenVal }));
  };
  const navigate = useNavigate();
  const isPresent = (id, array) => {
    if (array.find((item) => item._id === id)) return true;
    else return false;
  };

  return (
    <>
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
          {video.creator}&#166;&#166; {video.views}K
        </p>
      </div>
      <div className="dropdown-action-button">
        <BsThreeDotsVertical onClick={() => setShowDropdown(!showDropdown)} />
        {showDropdown && (
          <div className="dropdown">
            <button
              className="dropdown-button"
              onClick={() =>
                deleteVideoFromPlaylistHandler(playlistId, video._id)
              }
            >
              Delete Video From Playlist
              <CgPlayListRemove className="dropdown-icon" />
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
    </>
  );
}

export { VideoHorizontal };
