import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { useAuth } from "../../context/auth-context";
import { useVideo } from "../../context/video-context";
import {
  addVideoToPlaylistService,
  createNewPlaylistService,
  deletePlaylistService,
  removeVideoFromPlaylistService,
} from "../../services/playlistCalls";
import "./CreatePlaylist.css";
function CreatePlaylist() {
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const { authState, authDispatch } = useAuth();
  const { videoState } = useVideo();
  const { videoTobeAdded } = videoState;

  const { tokenVal } = authState;
  function isChecked(playlistVideo, videoId) {
    if (playlistVideo.find((video) => video._id === videoId) !== undefined)
      return true;
    return false;
  }

  const createNewPlaylistHandler = async () => {
    try {
      const playlistData = { title: currentPlaylist, description: "" };
      const { data, status } = await createNewPlaylistService(
        playlistData,
        tokenVal
      );
      if (status === 201) {
        authDispatch({
          type: "CREATE_NEW_PLAYLIST",
          payload: data.playlists,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deletePlaylistHandler = async (id) => {
    try {
      const { data, status } = await deletePlaylistService(id, tokenVal);
      if (status === 200) {
        authDispatch({ type: "DELETE_PLAYLIST", payload: data.playlists });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const addVideoToPlaylistHandler = async (id, video) => {
    try {
      const { data, status } = await addVideoToPlaylistService(
        id,
        video,
        tokenVal
      );
      if (status === 201)
        authDispatch({ type: "ADD_VIDEO_TO_PLAYLIST", payload: data.playlist });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteVideoFromPlaylistHandler = async (id, videoId) => {
    try {
      const { data, status } = await removeVideoFromPlaylistService(
        id,
        videoId,
        tokenVal
      );
      if (status === 200)
        authDispatch({
          type: "DELETE_VIDEO_FROM_PLAYLIST",
          payload: data.playlist,
        });
    } catch (err) {
      console.log(err);
    }
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
