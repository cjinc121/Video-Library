import "./PlaylistCard.css";
import React, { useState } from "react";
import { RiPlayListAddFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import nothing from "../../assets/nothing_thumbnail.width-800.jpg";
import { deletePlaylistService } from "../../services/playlistCalls";
import { useAuth } from "../../context/auth-context";
function PlaylistCard({ playlist }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { authState, authDispatch } = useAuth();
  const { tokenVal } = authState;
  const navigate = useNavigate();
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
  return (
    <>
      <div
        className="image-container"
        onClick={() => navigate(`/playlist/${playlist._id}`)}
      >
        <img
          src={
            playlist.videos.length === 0
              ? nothing
              : playlist.videos[0].thumbnail
          }
          alt="thumbnail"
        />
        <div className="playlist-cover">
          <p>{playlist.videos.length}</p>
          <RiPlayListAddFill />
        </div>
      </div>
      <div className="playlist-details">
        <div className="playlist-info">
          <h4>{playlist.title}</h4>
          <p>{playlist.description}</p>
        </div>
        <div className="dropdown-action-button">
          <BsThreeDotsVertical onClick={() => setShowDropdown(!showDropdown)} />
          {showDropdown && (
            <div className="dropdown">
              <button
                className="dropdown-button"
                onClick={() => deletePlaylistHandler(playlist._id)}
              >
                Delete Playlist
                <MdPlaylistAdd className="dropdown-icon" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export { PlaylistCard };
