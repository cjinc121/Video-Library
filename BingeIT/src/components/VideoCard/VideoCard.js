import React from "react";
import "./VideoCard.css";
import { AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { RiPlayListAddLine } from "react-icons/ri";
import { useVideo } from "../../context/video-context";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { CreatePlaylist } from "../CreatePlaylistcard/CreatePlaylist";
import VideoVertical from "../Videoinfo/vertical/VideoVertical";
function VideoCard({ onevideo }) {
  const { videoDispatch, videoState } = useVideo();
  const { video } = videoState;
  const suggested = video.filter(
    (vid) => vid.category === onevideo.category && vid._id !== onevideo._id
  );

  const {
    authState,
    addVideoToWatchLaterHandler,
    removeVideoFromWatchLaterHandler,
    removeVideoFromLikesHandler,
    addVideoToLikesHandler,
  } = useAuth();
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
      {video && (
        <div className="video-display-container">
          <div className="video-card-container">
            <div className="video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${onevideo._id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-details">
              <h3>{onevideo.title}</h3>
              <p>
                {onevideo.creator} &#166;&#166; {onevideo.views}K
              </p>
            </div>
            <div className="video-icons">
              {isPresent(onevideo._id, authState.likes) ? (
                <AiFillLike
                  className="icon active"
                  onClick={() => {
                    if (isUserLoggedIn)
                      removeVideoFromLikesHandler(onevideo._id);
                    else navigate("/login");
                  }}
                />
              ) : (
                <AiFillLike
                  className="icon"
                  onClick={() => {
                    if (isUserLoggedIn) addVideoToLikesHandler(onevideo);
                    else navigate("/login");
                  }}
                />
              )}
              <RiPlayListAddLine
                className="icon"
                onClick={() => {
                  if (isUserLoggedIn) {
                    videoDispatch({ type: "PLAYLIST_MODAL" });
                    videoDispatch({
                      type: "VIDEO_TO_BE_ADDED",
                      payload: onevideo,
                    });
                  } else navigate("/login");
                }}
              />
              {isPresent(onevideo._id, authState.watchlater) ? (
                <MdWatchLater
                  className="icon active"
                  onClick={() => {
                    if (isUserLoggedIn)
                      removeVideoFromWatchLaterHandler(onevideo._id);
                    else navigate("/login");
                  }}
                />
              ) : (
                <MdWatchLater
                  className="icon"
                  onClick={() => {
                    if (isUserLoggedIn) addVideoToWatchLaterHandler(onevideo);
                    else navigate("/login");
                  }}
                />
              )}
            </div>
          </div>
          <div className="suggested-box">
            <div className="suggested-header">Suggested Videos</div>
            <div className="suggested-display">
              {suggested.map((video) => (
                <VideoVertical video={video} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { VideoCard };
