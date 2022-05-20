import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addVideoToPlaylist,
  createNewPlaylist,
  deletePlaylist,
  deleteVideoFromPlaylist,
  getAuth,
} from "../../features/auth/authSlice";
import { getVideo } from "../../features/video/videoSlice";

import "./CreatePlaylist.css";
function CreatePlaylist() {
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const authState = useSelector(getAuth);
  const dispatch = useDispatch();
  const videoState = useSelector(getVideo);
  const { videoTobeAdded } = videoState;

  const { tokenVal } = authState;
  function isChecked(playlistVideo, videoId) {
    if (playlistVideo.find((video) => video._id === videoId) !== undefined)
      return true;
    return false;
  }

  const createNewPlaylistHandler = () => {
    const playlistData = { title: currentPlaylist, description: "" };
    dispatch(createNewPlaylist({ playlistData, tokenVal }));
  };
  const deletePlaylistHandler = (id) => {
    dispatch(deletePlaylist({ id, tokenVal }));
  };
  const addVideoToPlaylistHandler = async (id, video) => {
    dispatch(addVideoToPlaylist({ id, video, tokenVal }));
  };
  const deleteVideoFromPlaylistHandler = (id, videoId) => {
    dispatch(deleteVideoFromPlaylist({ id, videoId, tokenVal }));
  };
  return (
    <div className="playlist-container">
      <div className="playlist-input">
        <input
          type="text"
          placeholder="Create Playlist"
          onChange={(e) => setCurrentPlaylist(e.target.value)}
          value={currentPlaylist}
        />
        <AiOutlinePlus
          onClick={() => {
            currentPlaylist.length > 0 && createNewPlaylistHandler();
            setCurrentPlaylist("");
          }}
        />
      </div>
      <div className="playlistList">
        {authState.playlists.length > 0 &&
          authState.playlists.map((playlist) => {
            return (
              <div className="playlist-display-container" key={playlist._id}>
                <label>
                  <input
                    className="checkbox"
                    checked={isChecked(playlist.videos, videoTobeAdded._id)}
                    type="checkbox"
                    onChange={(e) => {
                      e.target.checked
                        ? addVideoToPlaylistHandler(
                            playlist._id,
                            videoTobeAdded
                          )
                        : deleteVideoFromPlaylistHandler(
                            playlist._id,
                            videoTobeAdded._id
                          );
                    }}
                  />
                  {playlist.title}
                </label>
                <MdDeleteOutline
                  onClick={() => deletePlaylistHandler(playlist._id)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export { CreatePlaylist };
